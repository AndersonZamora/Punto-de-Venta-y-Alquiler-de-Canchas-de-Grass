'use server';

import prisma from '@/lib/prisma';

export const getCashBalancesForMonth = async (dateEntry: string) => {

    try {

        const [year, month] = dateEntry.split('-').map(Number);
        const startOfMonth = new Date(year, month - 1, 1); //* Primer día del mes
        const endOfMonth = new Date(year, month, 0); //* Último día del mes

        const report = await prisma.cashRegister.aggregate({
            _sum: {
                totalSales: true,
                totalRentals: true,
                totalExpenses: true,
                closingBalance: true,
            },
            where: {
                openTime: {
                    gte: startOfMonth,
                    lte: endOfMonth,
                },
            },
        });

        const cashRegisters = await prisma.cashRegister.findMany({
            where: {
                openTime: {
                    gte: startOfMonth,
                    lt: endOfMonth,
                },
            },
            select: {
                openTime: true,
                openingBalance: true,
                closingBalance: true,
            },
            orderBy: {
                openTime: 'asc', //* Ordenamos por la fecha de apertura
            },
        });

        return {
            status: true,
            message: 'ok',
            cashRegisters,
            report: {
                totalSales: report._sum.totalSales || 0,
                totalRentals: report._sum.totalRentals || 0,
                totalExpenses: report._sum.totalExpenses || 0,
                closingBalance: report._sum.closingBalance || 0,
            }
        };

    } catch (error) {
        if (error instanceof Error) {
            return {
                cashRegisters: [],
                status: false,
                message: error.message,
                report: {
                    totalSales: 0,
                    totalRentals: 0,
                    totalExpenses: 0,
                    closingBalance: 0,
                }
            }
        }
        return {
            status: false,
            cashRegisters: [],
            report: {
                totalSales: 0,
                totalRentals: 0,
                totalExpenses: 0,
                closingBalance: 0,
            },
            message: 'Error no controlado - contacte al administrador',
        }
    }
}
