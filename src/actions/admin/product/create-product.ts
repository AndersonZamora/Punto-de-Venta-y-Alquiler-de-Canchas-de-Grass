'use server';

import { IProduct } from '@/interfaces';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export const createProduct = async (product: IProduct) => {

    try {

        const { description, purchasePrice, profitMargin, salePrice, profit } = product;

        const slug = description.trim()
            .replaceAll(' ', '_')
            .replaceAll("'", '')
            .toLocaleLowerCase() || '';

        const exist = await prisma.product.findUnique({
            where: { slug }
        })

        if (exist) {
            return {
                status: false,
                messsage: 'Producto ya registrado',
            }
        }

        await prisma.product.createMany({
            data: {
                purchasePrice: +Number(purchasePrice).toFixed(2),
                profitMargin: +parseFloat(`${+profitMargin}`).toFixed(2),
                salePrice: +parseFloat(`${+salePrice}`).toFixed(2),
                profit: +parseFloat(`${+profit}`).toFixed(2),
                description: description.toLocaleLowerCase().trim(),
                slug,
                stock: 0,
                state: false
            }
        })
 
        revalidatePath('/admin/productos');

        return {
            status: true,
            messsage: 'ok',
        }

    } catch (error) {
        console.log(error)
        return {
            status: false,
            product: null,
            messsage: 'Error no controlado - contacte al administrador',
        }

    }
}