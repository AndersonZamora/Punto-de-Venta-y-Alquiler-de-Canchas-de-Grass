'use server';

import { revalidatePath } from 'next/cache';
import { auth } from '@/auth.config';
import prisma from '@/lib/prisma';
import { dateServerSale } from '@/utils';

interface Props {
    id: string;
}

export const cashClose = async ({ id }: Props) => {

    try {

        const cashRegister = await prisma.cashRegister.findFirst({
            where: { id: id, status: true },
        });

        const session = await auth();

        const startOfDay = dateServerSale();

        if (!cashRegister) {
            return {
                status: false,
                message: 'No encotramos la caja',
            }
        }

        const closingBalance = cashRegister.openingBalance +
            cashRegister.totalSales +
            cashRegister.totalRentals -
            cashRegister.totalExpenses;

        await prisma.$transaction(async (tx) => {
            await tx.cashRegister.update({
                where: { id: id },
                data: {
                    status: false,
                    closedBy: session?.user.username,
                    closeTime: startOfDay,
                    closingBalance: +parseFloat(`${closingBalance}`).toFixed(2)
                },
            });
        })

        revalidatePath('/punto/caja');

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
