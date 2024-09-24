'use server';

import prisma from '@/lib/prisma';

interface Props {
    page?: number;
    take?: number;
    search?: string;
}

export const getProducts = async ({
    page = 1,
    take = 10,
    search = ''
}: Props) => {

    try {

        if (isNaN(Number(page))) page = 1;
        if (page < 1) page = 1;

        const slug = search.trim().replaceAll('_', ' ').toLocaleLowerCase();

        const products = await prisma.product.findMany({
            take: take,
            skip: (page - 1) * take,
            orderBy: [{ stock: 'asc' }, { state: 'asc' }],
            where: search.trim() !== "" ? {
                description: {
                    contains: slug.toLocaleLowerCase().trim(),
                    mode: 'insensitive',
                },
            } : undefined,
        });

        const totalCount = await prisma.product.count({
            where: search.trim() !== "" ? {
                description: {
                    contains: slug.toLocaleLowerCase().trim(),
                    mode: 'insensitive',
                },
            } : undefined,
        });

        const totalPages = Math.ceil(totalCount / take);

        return {
            status: true,
            messsage: 'ok',
            currentPage: page,
            totalPages: totalPages,
            products: products.map(data => ({
                ...data,
                createdAt: data.createdAt.toString(),
                updatedAt: data.updatedAt.toString(),
            }))
        }

    } catch (error) {
        return {
            status: true,
            currentPage: 0,
            totalPages: 0,
            messsage: 'Error no controlado - contacte al administrador',
            products: []
        }
    }
}