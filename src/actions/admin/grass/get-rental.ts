import prisma from '@/lib/prisma';
import { currentDateServer } from '@/utils';

interface Props {
    id: string
}

export const getRental = async ({ id }: Props) => {
    try {

        const searchCash = currentDateServer();
        searchCash.setHours(0, 0, 0, 0);

        const cashRegister = await prisma.cashRegister.findFirst({
            where: { id },
        });

        if (!cashRegister) {
            return {
                status: false,
                message: 'No hay una caja abierta actualmente',
                total: 0,
                rentals: []
            }
        }

        const rentals = await prisma.rental.findMany({
            where: {
                cashRegisterId: cashRegister.id
            }, orderBy: {
                startTime: 'desc'
            },
        })

        return {
            status: true,
            message: 'ok',
            cashStatus: cashRegister.status,
            total: cashRegister.totalRentals,
            rentals
        }

    } catch (error) {
        return {
            status: false,
            message: 'Error no controlado - contacte con el administrador',
            total: 0,
            rentals: []
        }
    }
}
