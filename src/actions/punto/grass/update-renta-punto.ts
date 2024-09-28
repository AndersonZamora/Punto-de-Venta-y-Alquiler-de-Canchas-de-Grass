'use server';

import { revalidatePath } from 'next/cache';
import prisma from '@/lib/prisma';

interface Props {
    id: string;
    description: string;
}

export const updateRentalPunto = async ({ id, description }: Props) => {

    try {

        const rentalDb = await prisma.rental.findFirst({
            where: { id },
        });

        if (!rentalDb) {
            return {
                status: false,
                message: 'No encotramos la reserva',
            }
        }

        await prisma.rental.update({
            where: { id: id },
            data: {
                description
            },
        });

        revalidatePath('/punto/grass');

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