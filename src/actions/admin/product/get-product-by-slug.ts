'use server';

import prisma from "@/lib/prisma"

export const getProductBySlug = async (slug: string) => {

    try {

        const product = await prisma.product.findFirst({
            where: {
                slug: slug
            }
        });

        if (!product) return null;

        return {
            ...product,
            createdAt: product.createdAt.toString(),
            updatedAt: product.updatedAt.toString(),
        }

    } catch (error) {
        throw new Error('Error no existe el producto')
    }
}