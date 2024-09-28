'use server';

import prisma from '@/lib/prisma';

export const getStockProducts = async () => {

    try {

        const products = await prisma.product.findMany({
            where: {
                state: true
            },
            orderBy: [
                { stock: 'asc' },
            ],
            select: {
                id: true,
                salePrice: true,
                description: true,
                stock: true,
            }
        });

        const totalPages = Math.ceil(products.length / 10);

        return {
            status: true,
            messsage: 'ok',
            products: products,
            totalPages,
        }

    } catch (error) {
        return {
            status: true,
            messsage: 'Error no controlado - contacte al administrador',
            products: [],
            totalPages:0,
        }
    }
}