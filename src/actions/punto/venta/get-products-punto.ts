'use server';

import prisma from "@/lib/prisma";

export const getProductsPunto = async () => {

    try {

        const products = await prisma.product.findMany({
            where: {
                // stock: {
                //     gt: 0
                // },
                state: true
            },
            orderBy: [
                { description: 'asc' },
            ],
            select: {
                id: true,
                salePrice: true,
                description: true,
                stock: true,
            }
        });

        const totalPages = Math.ceil(products.length / 5);

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