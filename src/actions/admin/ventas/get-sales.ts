'use server';

import prisma from '@/lib/prisma';

interface Props {
    id: string
}

export const getSales = async ({ id }: Props) => {

    try {

        const cashRegister = await prisma.cashRegister.findFirst({
            where: { id }
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
                products: true
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
                name: saleProduct.product,
                quantity: saleProduct.quantity,
                price: saleProduct.price,
                total: saleProduct.total,
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