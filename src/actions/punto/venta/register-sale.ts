'use server';

import { revalidatePath } from 'next/cache';
import { IBodegaProduct } from '@/interfaces';
import prisma from '@/lib/prisma';
import { currentDateServer, dateServerSale } from '@/utils';

interface Props {
    productIds: IBodegaProduct[];
}

export const registerSale = async ({ productIds }: Props) => {

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

        const products = await prisma.product.findMany({
            where: {
                id: {
                    in: productIds.map((p) => p.id),
                },
            },
        });

        const startSaveSale = dateServerSale();

        const { subTotal } = productIds.reduce(
            (totals, item) => {
                const productQuantity = item.quantity;
                const product = products.find((product) => product.id === item.id);

                if (!product) throw new Error(`${item.description} no existe - 500`);

                const subTotal = +product.salePrice * productQuantity;

                totals.subTotal += subTotal;

                return totals;
            },
            { subTotal: 0 }
        );

        await prisma.$transaction(async (tx) => {

            //! 1. Actualizar el stock de los productos
            const updatedProductsPromises = products.map((product) => {
                //!  Acumular los valores
                const productQuantity = productIds
                    .filter((p) => p.id === product.id)
                    .reduce((acc, item) => item.quantity + acc, 0);

                if (productQuantity === 0) {
                    throw new Error(`${product.id} no tiene cantidad definida`);
                }

                return tx.product.update({
                    where: { id: product.id },
                    data: {
                        stock: {
                            decrement: productQuantity,
                        },
                    },
                });
            });

            const updatedProducts = await Promise.all(updatedProductsPromises);

            //! 2. verificar stock
            updatedProducts.forEach((product) => {
                if (product.stock < 0) {
                    throw new Error(`${product.description} no tiene inventario suficiente`);
                }
            });

            //! 3. crear venta
            const createSale = await tx.sale.create({
                data: {
                    total: +parseFloat(`${subTotal}`).toFixed(2),
                    paymentMethod: 'efectivo',
                    saleTime: startSaveSale,
                    cashRegisterId: cashRegister?.id || '1',
                    products: {
                        create: productIds.map((product) => ({
                            product: product.description,
                            price: product.salePrice,
                            quantity: product.quantity,
                            total: +parseFloat(`${product.quantity * product.salePrice}`).toFixed(2),
                        })),
                    },
                },
            });

            //! 4. actualizar caja
            const updateCash = await tx.cashRegister.update({
                where: { id: cashRegister.id },
                data: {
                    totalSales: {
                        increment: subTotal, //! Asumiendo que `sale.total` es el total de la venta
                    },
                    closingBalance: {
                        increment: subTotal
                    }
                },
            });

            return {
                updatedProducts: updatedProducts,
                createSale: createSale,
                updateCash: updateCash
            }
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
