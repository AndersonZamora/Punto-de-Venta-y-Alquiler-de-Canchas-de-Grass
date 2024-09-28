'use server';

import prisma from '@/lib/prisma';
import { normalizeDate, separateDateSear, separateDateTimeEnd } from '@/utils';

interface Props {
    search: string;
}

export const cashStatus = async ({ search }: Props) => {

    try {

        const startDate = separateDateSear(`${search}`);
        const endDate = separateDateTimeEnd(`${search}`);

        const cashRegister = await prisma.cashRegister.findFirst({
            where: {
                openTime: {
                    gte: startDate,
                    lte: endDate,
                },
            },
        });

        if (!cashRegister) {
            return {
                status: false,
                message: 'Actualmente no exite una caja abierta',
                gastos: [],
                cashRegister: null,
                subTotal: 0,
            }
        }

        const gastos = await prisma.expense.findMany({
            where: { cashRegisterId: cashRegister.id }
        });

        const sales = cashRegister.totalSales || 0;
        const rentals = cashRegister.totalRentals || 0;
        const subTotal = sales + rentals;

        return {
            status: true,
            message: 'ok',
            gastos: gastos.map(data => ({
                id: data.id,
                description: data.description,
                amount: data.amount,
                expenseTime: `${normalizeDate(data.expenseTime)}`
            })),
            cashRegister,
            subTotal: +parseFloat(`${subTotal}`).toFixed(2),
        }

    } catch (error) {
        return {
            status: true,
            message: 'Error no controlado - contacte con el administrador',
            gastos: [],
            cashRegister: null,
            subTotal: 0
        }
    }
}

function isValidDate(date: any): boolean {
    const parsedDate = new Date(date);
    return parsedDate instanceof Date && !isNaN(parsedDate.getTime());
}
