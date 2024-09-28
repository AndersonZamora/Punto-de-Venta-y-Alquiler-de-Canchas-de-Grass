'use server';

import prisma from '@/lib/prisma';
import { separateDateTime, separateDateTimeEnd } from '@/utils';
import { differenceInDays, isAfter } from 'date-fns';

interface Props {
    startTime: string;
    endTime: string;
}

export const getRangesBalances = async ({ startTime, endTime }: Props) => {

    try {

        const startTimeS = separateDateTime(`${startTime}`);
        const endTimeS = separateDateTimeEnd(`${endTime}`);

        if (isAfter(startTimeS, endTimeS)) {
            throw new Error('El tiempo de Inico debe ser antes del tiempo de Fin');
        }

        const interval = differenceInDays(endTimeS, startTimeS);

        if (interval < 1) {
            throw new Error('Debe haber un intervalo mínimo de 1 día entre el Inicio y Fin');
        }

        const cashRegisters = await prisma.cashRegister.findMany({
            where: {
                openTime: {
                    gte: startTimeS,
                    lt: endTimeS,
                },
            },
            select: {
                id: true,
                openTime: true,
                openingBalance: true,
                closingBalance: true,
                totalSales: true,
                totalRentals: true,
                totalExpenses: true,
                openedBy: true,
                closedBy: true
            },
            orderBy: {
                openTime: 'asc',
            },
        });

        let balance = cashRegisters.reduce((subTotal, product) => (product.closingBalance) + subTotal, 0);
        const sales = cashRegisters.reduce((subTotal, product) => (product.totalSales) + subTotal, 0);
        const rentals = cashRegisters.reduce((subTotal, product) => (product.totalRentals) + subTotal, 0);
        const expenses = cashRegisters.reduce((subTotal, product) => (product.totalExpenses) + subTotal, 0);

        return {
            cashRegisters,
            reportd: {
                balance,
                sales,
                rentals,
                expenses
            },
            status: true,
            message: 'Listo'
        }

    } catch (error) {
        if (error instanceof Error) {
            return {
                cashRegisters: [],
                status: false,
                message: error.message,
                reportd: {
                    balance: 0,
                    sales: 0,
                    rentals: 0,
                    expenses: 0,
                },
            }
        }
        return {
            status: false,
            cashRegisters: [],
            reportd: {
                balance: 0,
                sales: 0,
                rentals: 0,
                expenses: 0,
            },
            message: 'Error no controlado - contacte al administrador',
        }
    }
}
