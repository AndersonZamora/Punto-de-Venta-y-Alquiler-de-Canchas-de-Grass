'use server';

import { auth } from '@/auth.config';
import prisma from '@/lib/prisma';
import { dateServerSale } from '@/utils';

interface Props {
    total: number;
}

export const cashOpen = async ({ total }: Props) => {

    try {

        const startOfDay = dateServerSale();

        const session = await auth();

        await prisma.cashRegister.createMany({
            data: {
                openedBy: session?.user.username || 'user',
                openTime: startOfDay,
                openingBalance: +parseFloat(`${total}`).toFixed(),
                closingBalance: +parseFloat(`${total}`).toFixed(),
                status: true,
                totalSales: 0,
                totalExpenses: 0,
                totalRentals: 0
            }
        });

        return {
            status: true,
            message: 'ok',
        }

    } catch (error) {
        return {
            status: false,
            message: 'Error no controlado - contacte con el administrador',
            cashRegister: null,
        }
    }
}
