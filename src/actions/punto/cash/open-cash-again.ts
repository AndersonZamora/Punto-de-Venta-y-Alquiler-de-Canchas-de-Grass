'use server';

import { revalidatePath } from 'next/cache';
import { auth } from '@/auth.config';
import prisma from '@/lib/prisma';

interface Props {
    id: string;
}

export const openCashAgain = async ({ id }: Props) => {

    try {

        const cashRegister = await prisma.cashRegister.findFirst({
            where: { id },
        });

        const session = await auth();

        if (!cashRegister) {
            return {
                status: false,
                message: 'No encotramos la caja',
            }
        }

        await prisma.cashRegister.update({
            where: { id: id },
            data: {
                status: true,
                openedBy: session?.user.username
            },
        });

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
