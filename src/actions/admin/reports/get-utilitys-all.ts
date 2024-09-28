'use server';

import prisma from '@/lib/prisma';
import { currentDateServer } from '@/utils';
import { endOfYear, startOfYear } from 'date-fns';

interface Props {
    search: string;
}

export const getUtilitys = async ({ search }: Props) => {
    try {

        let startDate = startOfYear(new Date(+search, 0, 1));
        let endDate = endOfYear(new Date(+search, 0, 1));

        if (!isValidDate(startDate)) {
            startDate = startOfYear(currentDateServer())
            endDate = startOfYear(currentDateServer())
        }

        const utilitys = await prisma.utility.findMany({
            where: {
                endTime: {
                    gte: startDate,
                    lte: endDate
                }
            },
            orderBy: {
                endTime: 'asc'
            }
        });

        return {
            utilitys,
            status: true,
            message: 'Ok',
        }

    } catch (error) {
        if (error instanceof Error) {
            return {
                utilitys: [],
                status: false,
                message: error.message,
            }
        }
        return {
            utilitys: [],
            status: false,
            message: 'Error no controlado - contacte al administrador',
        }
    }
}

function isValidDate(date: any): boolean {
    const parsedDate = new Date(date);
    return parsedDate instanceof Date && !isNaN(parsedDate.getTime());
}