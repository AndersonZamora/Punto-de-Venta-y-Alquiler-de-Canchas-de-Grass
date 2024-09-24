'use server';

import prisma from "@/lib/prisma";

export const getWeeklyReportReport = async (selectWeekly: Date) => {
    try {

        const dayOfWeek = selectWeekly.getDay();

        //* Ajustar para que el lunes sea el primer día de la semana
        const startOfWeek = new Date(selectWeekly);
        const diff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek; //* Si es domingo, retrocede 6 días, si no, ajusta al lunes
        startOfWeek.setDate(selectWeekly.getDate() + diff);

        //* Establecer el domingo como último día de la semana
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6); //* Añadir 6 días para llegar al domingo

        //* Establecer hora
        startOfWeek.setHours(0, 0, 0, 0);
        endOfWeek.setHours(0, 0, 0, 0);

        const report = await prisma.cashRegister.aggregate({
            _sum: {
                totalSales: true,
                totalRentals: true,
                totalExpenses: true,
                openingBalance: true,
                closingBalance: true,
            },
            where: {
                openTime: {
                    gte: startOfWeek,
                    lte: endOfWeek,
                },
            },
        });

        const result = await prisma.cashRegister.findMany({
            where: {
                openTime: {
                    gte: startOfWeek, // Solo los registros de la última semana
                },
            },
            select: {
                openTime: true, // Para obtener la fecha de apertura de caja
                totalSales: true, // Total de ventas
                totalRentals: true, // Total de alquileres
                totalExpenses: true, // Total de gastos
            },
        });

        return {
            result: result,
            totalSales: report._sum.totalSales || 0,
            totalRentals: report._sum.totalRentals || 0,
            totalExpenses: report._sum.totalExpenses || 0,
            openingBalance: report._sum.openingBalance || 0,
            closingBalance: report._sum.closingBalance || 0,
        };

    } catch (error) {
        console.log(error);
        return {
            result: [],
            totalSales: 0,
            totalRentals: 0,
            totalExpenses: 0,
            openingBalance: 0,
            closingBalance: 0,
        }
    }
}