'use server';

import { revalidatePath } from 'next/cache';
import prisma from '@/lib/prisma';
import { currentDateServer, dateServerSale } from '@/utils';

interface Props {
    description: string;
    amount: number;
}

export const cashWithdrawMoney = async ({ description, amount }: Props) => {

    try {

        const searchCash = currentDateServer();
        searchCash.setHours(0, 0, 0, 0);

        const cashRegister = await prisma.cashRegister.findFirst({
            where: {
                openTime: {
                    gte: searchCash
                },
                status: true,
            },
        });

        if (!cashRegister) {
            return {
                status: false,
                message: 'No hay una caja abierta actualmente'
            }
        }

        const startOfDay = dateServerSale();

        await prisma.$transaction(async (tx) => {

            await tx.expense.createMany({
                data: {
                    description: description.toLocaleLowerCase().trim(),
                    amount: +amount,
                    expenseTime: startOfDay,
                    cashRegisterId: cashRegister.id
                }
            })

            await tx.cashRegister.update({
                where: { id: cashRegister.id },
                data: {
                    totalExpenses: {
                        increment: +amount,
                    },
                    closingBalance: {
                        decrement: +amount
                    }
                },
            });
        })

        revalidatePath('/punto/caja');
        revalidatePath('/admin/ventas');

        return {
            status: true,
            message: 'ok',
        }

    } catch (error) {
        return {
            status: false,
            message: 'Error no controlado - contacte con el administrador',
        }
    }
}