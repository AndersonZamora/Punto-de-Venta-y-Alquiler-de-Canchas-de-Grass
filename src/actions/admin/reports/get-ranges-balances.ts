'use server';

import prisma from '@/lib/prisma';
import { normalizeDateExport, separateDateTime, separateDateTimeEnd } from '@/utils';
import { differenceInDays, isAfter } from 'date-fns';

interface Props {
    startTime: string;
    endTime: string;
}

interface ISale {
    Total: number;
    Fecha: string;
}

interface IProdu {
    Fecha: string;
    Producto: string;
    Pricio: number;
    Cantidad: number;
    Total: number;
}

interface IRental {
    Nombre: string;
    DNI: string;
    Celular: string;
    Inicio: string;
    Fin: string;
    Total: number;
    Descripcion: string;
    Usuario: string;
}

interface IExpense {
    Fecha: string;
    Descripcion: string;
    Monto: number;
}

interface IDocument {
    Fecha: string;
    Numero: string;
    Total: number
}

export const getRangesBalances = async ({ startTime, endTime }: Props) => {
    try {
        const startTimeS = separateDateTime(`${startTime}`);
        const endTimeS = separateDateTimeEnd(`${endTime}`);

        if (isAfter(startTimeS, endTimeS)) {
            throw new Error('El tiempo de Inicio debe ser antes del tiempo de Fin');
        }

        const interval = differenceInDays(endTimeS, startTimeS);
        if (interval < 1) {
            throw new Error('Debe haber un intervalo mínimo de 1 día entre el Inicio y Fin');
        }

        const cashRegisters = await prisma.cashRegister.findMany({
            where: {
                openTime: {
                    gte: startTimeS,
                    lt: endTimeS,
                },
            },
            select: {
                id: true,
                openTime: true,
                openingBalance: true,
                closingBalance: true,
                totalSales: true,
                totalRentals: true,
                totalExpenses: true,
                sales: {
                    select: {
                        total: true,
                        saleTime: true,
                        products: {
                            select: {
                                product: true,
                                price: true,
                                quantity: true,
                                total: true,
                            }
                        }
                    }
                },
                rentals: {
                    select: {
                        customerName: true,
                        documentDni: true,
                        phone: true,
                        startTime: true,
                        endTime: true,
                        total: true,
                        description: true,
                        registeredBy: true,
                    }
                },
                expenses: {
                    select: {
                        expenseTime: true,
                        description: true,
                        amount: true,
                    }
                }
            },
            orderBy: {
                openTime: 'asc',
            },
        });

        const purchaseList = await prisma.purchase.findMany({
            where: {
                purchaseDate: {
                    gte: startTimeS,
                    lt: endTimeS,
                },
            },
            select: {
                purchaseDate: true,
                total: true,
                documentNumber: true,
                products: {
                    select: {
                        product: {
                            select: {
                                description: true
                            }
                        },
                        quantity: true,
                        costPrice: true,
                        total: true
                    }
                }
            }
        })

        const newSales: ISale[] = [];
        const newRentals: IRental[] = [];
        const newExpenses: IExpense[] = [];
        const newProducts: IProdu[] = [];
        const newPurchaseProducts: IProdu[] = [];
        const newDocuments: IDocument[] = [];

        cashRegisters.forEach((register) => {

            register.sales.forEach((sale) => {
                newSales.push({
                    Fecha: normalizeDateExport(sale.saleTime),
                    Total: sale.total,
                });

                sale.products.forEach((product) => {
                    newProducts.push({
                        Fecha: normalizeDateExport(register.openTime),
                        Producto: product.product,
                        Pricio: product.price,
                        Cantidad: product.quantity,
                        Total: product.total,
                    });
                });
            });

            register.rentals.forEach(({ customerName, documentDni, phone, startTime, endTime, total, description = '-', registeredBy }) => {
                newRentals.push({
                    Nombre: customerName,
                    DNI: documentDni,
                    Celular: phone,
                    Inicio: normalizeDateExport(startTime),
                    Fin: normalizeDateExport(endTime),
                    Total: total,
                    Descripcion: description || '-',
                    Usuario: registeredBy,
                });
            });

            register.expenses.forEach(({ expenseTime, description, amount }) => {
                newExpenses.push({
                    Fecha: normalizeDateExport(expenseTime),
                    Descripcion: description,
                    Monto: amount,
                });
            });
        });

        purchaseList.forEach((pursch) => {
            
            newDocuments.push({
                Fecha: normalizeDateExport(pursch.purchaseDate),
                Numero: pursch.documentNumber || '-',
                Total: pursch.total
            })

            pursch.products.forEach(({ costPrice, product, quantity, total }) => {
                newPurchaseProducts.push({
                    Cantidad: quantity,
                    Fecha: normalizeDateExport(pursch.purchaseDate),
                    Pricio: costPrice,
                    Total: total,
                    Producto: product.description
                })
            })
        })

        return {
            newRentals,
            newSales,
            newExpenses,
            newProducts,
            newPurchaseProducts,
            newDocuments,
            status: true,
            message: 'Listo'
        };

    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Error no controlado - contacte al administrador';
        return {
            newRentals: [],
            newSales: [],
            newExpenses: [],
            newProducts: [],
            newSaleProducts: [],
            newPurchaseProducts:[],
            newDocuments:[],
            status: false,
            message: errorMessage,
        };
    }
};

