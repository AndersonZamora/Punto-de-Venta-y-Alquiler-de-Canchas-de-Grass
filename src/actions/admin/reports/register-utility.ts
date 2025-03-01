'use server';

import { revalidatePath } from 'next/cache';
import prisma from '@/lib/prisma';
import { separateDateTime, separateDateTimeEnd } from '@/utils';
import { differenceInDays, isAfter } from 'date-fns';

interface IUtility {
    total: number;
    startTime: string;
    endTime: string;
}

export const registerUtility = async (data: IUtility) => {

    try {

        const startTime = separateDateTime(data.startTime);
        const endTime = separateDateTimeEnd(data.endTime);

        if (isAfter(startTime, endTime)) {
            throw new Error('El tiempo de Inicio debe ser antes del tiempo Fin');
        }

        const interval = differenceInDays(endTime, startTime);

        if (interval < 2) {
            throw new Error('Debe haber un intervalo mínimo de 2 dias entre el tiempo de Inicio y el tiempo Fin');
        }

        //! Verificar si hay conflictos en la base de datos
        const overlappingRentals = await prisma.utility.findMany({
            where: {
                OR: [
                    //! Caso 1: Reservas que empiezan antes de la nueva reserva pero terminan durante o después
                    {
                        startTime: {
                            lte: startTime,
                        },
                        endTime: {
                            gte: startTime,
                        },
                    },
                    //! Caso 2: Reservas que empiezan durante el nuevo rango
                    {
                        startTime: {
                            lte: endTime,
                            gte: startTime,
                        },
                    },
                ],
            },
        });

        if (overlappingRentals.length > 0) {
            throw new Error('El rango de tiempo ya fue calculado');
        }

        await prisma.$transaction(async (tx) => {

            //! 1 Obetener las cajas

            const cashRegisterAll = await tx.cashRegister.findMany({
                where: {
                    openTime: {
                        gte: startTime,
                        lte: endTime
                    }
                },
                select: {
                    id: true
                }
            })

            const cashRegisterIds = cashRegisterAll.map(cash => cash.id);

            //* 2 eliminar ventas
            //! 2.1 se obtinene todos las ventas que tengan cashRegisterIds
            const saleToDelete = await tx.sale.findMany({
                where: {
                    cashRegisterId: {
                        in: cashRegisterIds
                    },
                },
                select: {
                    id: true, //! Solo seleccionamos el id
                },
            });

            const salesIds = saleToDelete.map(sale => sale.id);

            //! 2.2 Eliminar el detalle relacionado a la venta
            const deletedDetailSale = await tx.saleProduct.deleteMany({
                where: {
                    saleId: {
                        in: salesIds,
                    },
                },
            });

            //! 2.3 Eliminar las ventas
            const deletedSales = await tx.sale.deleteMany({
                where: {
                    id: {
                        in: salesIds,
                    },
                },
            });

            //! 3 eliminar los alquileres
            const deletedRentals = await tx.rental.deleteMany({
                where: {
                    cashRegisterId: {
                        in: cashRegisterIds
                    }
                },
            })

            //! 4 eliminar los gastos
            const deletedExpeneses = await tx.expense.deleteMany({
                where: {
                    cashRegisterId: {
                        in: cashRegisterIds
                    }
                }
            })

            //* 4 eliminar compras

            //! 4.1 se obtinene todos las compras que tengan la fecha (endTime)

            const purchasesToDelete = await tx.purchase.findMany({
                where: {
                    purchaseDate: {
                        gte: startTime,
                        lte: endTime,
                    },
                },
                select: {
                    id: true, //! Solo seleccionamos el id
                },
            });

            const purchaseIds = purchasesToDelete.map(purchase => purchase.id);

            //! 4.2 Eliminar el detalle relacionado a la compra
            const deletedDetailPurchases = await tx.purchaseProduct.deleteMany({
                where: {
                    purchaseId: {
                        in: purchaseIds,
                    },
                },
            });

            //! 4.3 Eliminar las compras
            const deletedPurchases = await tx.purchase.deleteMany({
                where: {
                    id: {
                        in: purchaseIds,
                    },
                },
            });

            //! 5 Eliminar cajas

            const deleteCashRegister = await tx.cashRegister.deleteMany({
                where: {
                    id: {
                        in: cashRegisterIds
                    }
                }
            })

            //!6 registrar utilidad
            const registerUtility = await tx.utility.createMany({
                data: {
                    total: +parseFloat(`${data.total}`).toFixed(2),
                    startTime,
                    endTime
                }
            });

            return {
                cashRegisterAll,
                deletedDetailSale,
                deletedSales,
                deletedRentals,
                deletedExpeneses,
                deletedDetailPurchases,
                deletedPurchases,
                deleteCashRegister,
                registerUtility,
            }
        })


        revalidatePath('/admin/utilities');

        return {
            status: true,
            message: 'Ok',
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
