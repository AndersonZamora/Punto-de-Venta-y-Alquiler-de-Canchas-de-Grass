'use server'

import prisma from '@/lib/prisma';
import { separateDateTime, separateDateTimeEnd } from '@/utils';
import { differenceInDays, isAfter } from 'date-fns';

interface Props {
    startTime: string;
    endTime: string;
}

export const getTotals = async ({ startTime, endTime }: Props) => {
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
                openTime: true,
                openingBalance: true,
                closingBalance: true,
                totalSales: true,
                totalRentals: true,
                totalExpenses: true,
            },
            orderBy: {
                openTime: 'asc',
            },
        });

        const summary = {
            sales: 0,
            rentals: 0,
            expenses: 0,
        };

        cashRegisters.forEach((register) => {
            summary.sales += register.totalSales;
            summary.rentals += register.totalRentals;
            summary.expenses += register.totalExpenses;
        });

        const reportPurcha = await prisma.purchase.aggregate({
            _sum: {
                total: true,
            },
            where: {
                purchaseDate: {
                    gte: startTimeS,
                    lte: endTimeS,
                },
            },
        });

        return {
            cashRegisters: cashRegisters.map(({ openTime, openingBalance, closingBalance }) => ({
                openTime,
                openingBalance,
                closingBalance,
            })),
            report: {
                totalSales: summary.sales,
                totalRentals: summary.rentals,
                totalExpenses: summary.expenses,
                totalPurchas: reportPurcha._sum.total || 0,
            },
            status: true,
            message: 'Listo'
        }
    } catch (error) {

        const errorMessage = error instanceof Error ? error.message : 'Error no controlado - contacte al administrador';

        return {
            cashRegisters: [],
            report: {
                totalSales: 0,
                totalRentals: 0,
                totalExpenses: 0,
                totalPurchas: 0,
            },
            status: false,
            message: errorMessage,
        }
    }
}