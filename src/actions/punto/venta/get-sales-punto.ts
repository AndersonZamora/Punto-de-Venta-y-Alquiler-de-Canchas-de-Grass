'use server';

import prisma from '@/lib/prisma';
import { currentDateServer } from '@/utils';

export const getSalesPunto = async () => {

    try {

        const searchCash = currentDateServer();
        searchCash.setHours(0, 0, 0, 0);

        const cashRegister = await prisma.cashRegister.findFirst({
            where: {
                openTime: {
                    gte: searchCash
                }
            },
        });

        if (!cashRegister) {
            return {
                status: false,
                message: 'No hay una caja abierta actualmente',
                total: 0,
                ventas: []
            }
        }

        const sales = await prisma.sale.findMany({
            where: {
                cashRegisterId: cashRegister.id
            },
            orderBy: {
                saleTime: 'desc'
            },
            include: {
                products: {
                    select: {
                        id: true,
                        product: true,
                        price: true,
                        quantity: true,
                        total: true
                    }
                }
            }
        })

        const ventas = sales.map(sale => ({
            id: sale.id,
            total: sale.total,
            saleTime: sale.saleTime,
            products: sale.products.map(saleProduct => ({
                id: saleProduct.id,
                name: saleProduct.product,
                quantity: saleProduct.quantity,
                price: saleProduct.price,
                total: saleProduct.total
            })),
        }));

        return {
            status: true,
            message: 'ok',
            total: cashRegister.totalSales,
            ventas
        }

    } catch (error) {
        return {
            status: false,
            message: 'Error no controlado - contacte con el administrador',
            total: 0,
            ventas: []
        }
    }
}