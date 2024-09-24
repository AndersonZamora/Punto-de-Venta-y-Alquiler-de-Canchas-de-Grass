'use server';

import prisma from '@/lib/prisma';
import { currentDateServer } from '@/utils';

export const getSales = async () => {

    try {

        const searchCash = currentDateServer();
        searchCash.setHours(0, 0, 0, 0);

        const cashRegister = await prisma.cashRegister.findFirst({
            where: {
                openTime: {
                    gte: searchCash
                },
            },
        });

        if (!cashRegister) {
            return {
                status: false,
                cashStatus: false,
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
                    include: {
                        product: {
                            select: {
                                id: true,
                                description: true,
                                salePrice: true
                            },
                        },
                    },
                }
            }
        })

        const ventas = sales.map(sale => ({
            id: sale.id,
            total: sale.total,       //* Total de la venta
            saleTime: sale.saleTime, //* Hora de la venta
            openedBy: cashRegister.openedBy,
            closedBy: cashRegister.closedBy,
            products: sale.products.map(saleProduct => ({
                id: saleProduct.id,
                name: saleProduct.product.description,
                quantity: saleProduct.quantity,
                price: saleProduct.product.salePrice,
                total: saleProduct.quantity * saleProduct.product.salePrice,
            })),
        }));

        return {
            status: true,
            message: 'ok',
            cashStatus: cashRegister.status,
            total: cashRegister.totalSales,
            ventas
        }

    } catch (error) {
        return {
            status: false,
            cashStatus: false,
            message: 'Error no controlado - contacte con el administrador',
            total: 0,
            ventas: []
        }
    }
}