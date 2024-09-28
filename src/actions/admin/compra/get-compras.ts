'use server';

import prisma from '@/lib/prisma';
import { addOneDay, normalizeDate } from '@/utils';

interface Props {
    page?: number;
    take?: number;
    search?: string;
}

export const getCompras = async ({
    page = 1,
    take = 5,
    search = ''
}: Props) => {

    try {

        if (isNaN(Number(page))) page = 1;
        if (page < 1) page = 1;

        const date = addOneDay(new Date(search), 1);

        if (!isValidDate(date) && search !== '') {
            return {
                status: false,
                messsage: 'Fecha no valida',
                currentPage: 0,
                totalPages: 0,
                purchases: []
            }
        }

        const startOfDay = new Date(date);

        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date(date);
        endOfDay.setHours(23, 59, 59, 999);

        const purchases = await prisma.purchase.findMany({
            take: take,
            skip: (page - 1) * take,
            orderBy: { purchaseDate: 'desc' },
            where: search.trim() !== "" ? {
                purchaseDate: {
                    gte: startOfDay,
                    lte: endOfDay,
                },
            } : undefined,
        });

        const totalCount = await prisma.purchase.count({
            where: search.trim() !== "" ? {
                purchaseDate: {
                    gte: startOfDay,
                    lte: endOfDay,
                },
            } : undefined,
        });

        const totalPages = Math.ceil(totalCount / take);

        return {
            status: true,
            messsage: 'ok',
            currentPage: page,
            totalPages: totalPages,
            purchases: purchases.map(data => ({
                ...data,
                purchaseDate: `${normalizeDate(data.purchaseDate)}`
            }))
        }

    } catch (error) {
        return {
            status: true,
            currentPage: 0,
            totalPages: 0,
            messsage: 'Error no controlado - contacte al administrador',
            purchases: []
        }
    }
}

function isValidDate(date: any): boolean {
    const parsedDate = new Date(date);
    return parsedDate instanceof Date && !isNaN(parsedDate.getTime());
}
