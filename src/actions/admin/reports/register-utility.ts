'use server';

import { revalidatePath } from 'next/cache';
import prisma from '@/lib/prisma';
import { separateDateTime, separateDateTimeEnd } from '@/utils';
import { differenceInDays, isAfter } from 'date-fns';

interface IUtility {
    total: number;
    startTime: string;
    endTime: string;
}

export const registerUtility = async (data: IUtility) => {

    try {

        const startTime = separateDateTime(data.startTime);
        const endTime = separateDateTimeEnd(data.endTime);

        if (isAfter(startTime, endTime)) {
            throw new Error('El tiempo de Inicio debe ser antes del tiempo Fin');
        }

        const interval = differenceInDays(endTime, startTime);

        if (interval < 2) {
            throw new Error('Debe haber un intervalo mínimo de 2 dias entre el tiempo de Inicio y el tiempo Fin');
        }

        //! Verificar si hay conflictos en la base de datos
        const overlappingRentals = await prisma.utility.findMany({
            where: {
                OR: [
                    //! Caso 1: Reservas que empiezan antes de la nueva reserva pero terminan durante o después
                    {
                        startTime: {
                            lte: startTime,
                        },
                        endTime: {
                            gte: startTime,
                        },
                    },
                    //! Caso 2: Reservas que empiezan durante el nuevo rango
                    {
                        startTime: {
                            lte: endTime,
                            gte: startTime,
                        },
                    },
                ],
            },
        });

        if (overlappingRentals.length > 0) {
            throw new Error('El rango de tiempo ya fue calculado');
        }

        await prisma.utility.createMany({
            data: {
                total: +parseFloat(`${data.total}`).toFixed(2),
                startTime,
                endTime
            }
        });

          //! eliminar todas las ventas y compras menores al rango calulado

        revalidatePath('/admin/utilities');

        return {
            status: true,
            message: 'Ok',
        }

    } catch (error) {
        if (error instanceof Error) {
            return {
                status: false,
                message: error.message,
            }
        }
        return {
            status: false,
            message: 'Error no controlado - contacte al administrador',
        }
    }
}
