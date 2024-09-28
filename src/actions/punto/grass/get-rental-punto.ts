'use server';

import prisma from '@/lib/prisma';
import { currentDateServer } from '@/utils';

export const getRentalPunto = async () => {
    try {

        const searchCash = currentDateServer();
        searchCash.setHours(0, 0, 0, 0);

        const cashRegister = await prisma.cashRegister.findFirst({
            where: {
                openTime: {
                    gte: searchCash
                },
            },
        });

        if (!cashRegister) {
            return {
                status: false,
                message: 'No hay una caja abierta actualmente'
            }
        }

        const rentals = await prisma.rental.findMany({
            where: {
                cashRegisterId: cashRegister.id
            }, orderBy: {
                startTime: 'desc'
            },
        })

        const totalPages = Math.ceil(rentals.length / 10);

        return {
            status: true,
            message: 'ok',
            total: cashRegister.totalRentals,
            rentals,
            totalPages
        }

    } catch (error) {
        return {
            status: false,
            message: 'Error no controlado - contacte con el administrador',
            total: 0,
            rentals: [],
            totalPages: 0,
        }
    }
}