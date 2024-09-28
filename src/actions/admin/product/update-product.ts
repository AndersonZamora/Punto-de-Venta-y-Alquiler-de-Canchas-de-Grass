'use server';


import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { IProduct } from '@/interfaces';

export const updateProduct = async (product: IProduct) => {

    try {

        const { description, purchasePrice, profitMargin, salePrice, profit, state, id } = product;

        const slug = description.trim()
            .replaceAll(' ', '_')
            .replaceAll("'", '')
            .toLocaleLowerCase() || '';

        const exist = await prisma.product.findUnique({
            where: { id }
        })

        if (!exist) {
            return {
                status: false,
                messsage: 'Producto eliminado',
            }
        }

        await prisma.product.updateMany({
            data: {
                purchasePrice: +parseFloat(`${purchasePrice}`).toFixed(2),
                profitMargin: +parseFloat(`${+profitMargin}`).toFixed(2),
                salePrice: +parseFloat(`${+salePrice}`).toFixed(2),
                profit: +parseFloat(`${+profit}`).toFixed(2),
                description: description.toLocaleLowerCase().trim(),
                slug,
                state,
            },
            where: { id }
        })

        revalidatePath('/admin/productos');

        return {
            status: true,
            messsage: 'ok',
        }

    } catch (error) {
        return {
            status: false,
            product: null,
            messsage: 'Error no controlado - contacte al administrador',
        }
    }
}