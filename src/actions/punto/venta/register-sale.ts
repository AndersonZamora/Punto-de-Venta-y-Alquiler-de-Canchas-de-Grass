'use server';

import { revalidatePath } from 'next/cache';
import { IBodegaProduct } from '@/interfaces';
import prisma from '@/lib/prisma';
import { currentDateServer, dateServerSale } from '@/utils';

interface Props {
    products: IBodegaProduct[];
}

export const registerSale = async ({ products }: Props) => {

    try {

        const startOfDay = currentDateServer();
        startOfDay.setHours(0, 0, 0, 0);

        const cashRegister = await prisma.cashRegister.findFirst({
            where: {
                openTime: {
                    gte: startOfDay
                },
                status: true
            },
        });

        if (!cashRegister) {
            return {
                status: false,
                message: 'No hay una caja abierta actualmente'
            }
        }

        await prisma.$transaction(async (prisma) => {
            for (const product of products) {
                const existingProduct = await prisma.product.findUnique({
                    where: { id: product.id },
                });

                if (!existingProduct) {
                    throw new Error(`El producto: ${product.description} no existe.`);
                }

                if (!(existingProduct.stock >= product.quantity)) {
                    throw new Error(`Stock insuficiente para el producto: ${existingProduct.description}. Solo quedan ( ${existingProduct.stock} ) unidades disponibles. Recarge el navegador`);
                }
            }
        });

        const total = products.reduce((subTotal, product) => (product.quantity * product.salePrice) + subTotal, 0)

        const startSaveSale = dateServerSale();

        await prisma.sale.create({
            data: {
                total: total,
                paymentMethod: 'efectivo',
                saleTime: startSaveSale,
                cashRegisterId: cashRegister?.id || '1',
                products: {
                    create: products.map((product) => ({
                        productId: product.id,
                        quantity: product.quantity,
                        total: 1,
                    })),
                },
            },
        });

        await prisma.$transaction(async (prisma) => {
            for (const product of products) {
                await prisma.product.update({
                    where: { id: product.id },
                    data: {
                        state: true,
                        stock: {
                            decrement: product.quantity
                        },
                    },
                });
            }
        })

        await prisma.cashRegister.update({
            where: { id: cashRegister.id },
            data: {
                totalSales: {
                    increment: total, //* Asumiendo que `sale.total` es el total de la venta
                },
                closingBalance: {
                    increment: total
                }
            },
        });

        revalidatePath('/punto/bodega/make');
        revalidatePath('/admin/ventas');

        return {
            status: true,
            message: 'ok',
        }

    } catch (error) {
        if (error instanceof Error) {
            return {
                status: false,
                message: error.message,
            }
        }
        return {
            status: false,
            message: 'Error no controlado - contacte al administrador',
        }
    }
}
