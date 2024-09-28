'use server';

import { revalidatePath } from 'next/cache';
import prisma from '@/lib/prisma';
import { dateServerPurchase } from '@/utils';

interface SaleP {
    id: string;
    purchasePrice: number;
    profitMargin: number;
    salePrice: number;
    profit: number;
    quantity: number;
}

interface Props {
    dateEntry: string;
    ticketNumber: string;
    sales: SaleP[]
}

export const registerComrpaProducts = async ({
    dateEntry,
    ticketNumber,
    sales
}: Props) => {

    try {

        if (sales.length <= 0) {
            return {
                status: false,
                messsage: 'Se necesita productos para realizar la compra'
            }
        }

        const total = sales.reduce((subTotal, product) => (product.quantity * product.purchasePrice) + subTotal, 0)

        const startOfDay = dateServerPurchase(dateEntry)

        await prisma.purchase.create({
            data: {
                purchaseDate:  startOfDay,
                documentNumber: ticketNumber,
                total,
                products: {
                    create: sales.map((product) => ({
                        productId: product.id,
                        quantity: product.quantity,
                        costPrice: product.purchasePrice,
                        total: +parseFloat(`${product.quantity * product.purchasePrice}`).toFixed()
                    })),
                }
            }
        })

        for (const product of sales) {
            await prisma.product.update({
                where: { id: product.id },
                data: {
                    state:true,
                    stock: {
                        increment: product.quantity
                    },
                },
            });
        }

        revalidatePath('/admin/compras');
        revalidatePath('/punto/bodega');

        return {
            status: true,
            messsage: 'ok'
        }

    } catch (error) {
        return {
            status: false,
            messsage: 'Error no controlado - contacte al administrador'
        }
    }
}