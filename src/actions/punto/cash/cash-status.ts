'use server';

import prisma from "@/lib/prisma";
import { currentDateServer, normalizeDate } from "@/utils";

export const cashStatus = async () => {

    try {
 
        const startOfDay = currentDateServer();
        startOfDay.setHours(0, 0, 0, 0);

        const cashRegister = await prisma.cashRegister.findFirst({
            where: {
                openTime: {
                    gte: startOfDay
                },
            },
        });

        if (!cashRegister) {
            return {
                status: false,
                message: 'Actualmente no exite una caja abierta',
                gastos: [],
                cashRegister: null,
                total: 0,
                subTotal:0,
            }
        }

        const gastos = await prisma.expense.findMany({
            where: { cashRegisterId: cashRegister.id }
        });

        const sales = cashRegister.totalSales || 0;
        const rentals = cashRegister.totalRentals || 0;
        const opening = cashRegister.openingBalance || 0;
        const expenses = cashRegister.totalExpenses || 0;

        const subTotal = sales + rentals;
        const total = opening + subTotal - expenses;

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
            total: +parseFloat(`${total}`).toFixed(2),
        }

    } catch (error) {
        return {
            status: true,
            message: 'Error no controlado - contacte con el administrador',
            gastos: [],
            cashRegister: null,
            total: 0,
            subTotal:0
        }
    }
}
