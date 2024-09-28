'use server';

import prisma from '@/lib/prisma';
import { normalizeDate } from '@/utils';

interface Props {
    id: string
}

export const getCompraById = async ({ id }: Props) => {

    try {

        const purchase = await prisma.purchase.findFirst({
            where: { id },
            orderBy: { purchaseDate: 'desc' },
            include: {
                products: {
                    select: {
                        id: true,
                        quantity: true,
                        costPrice: true,
                        total: true,
                        product: {
                            select: {
                                id: true,
                                description: true
                            }
                        }
                    }
                },
            }
        });

        if (!purchase) {
            return {
                status: false,
                messsage: 'No se encontro la venta',
                purchase: null
            }
        }

        return {
            status: true,
            messsage: 'ok',
            purchase: {
                ...purchase,
                purchaseDate: `${normalizeDate(purchase.purchaseDate)}`
            }
        }

    } catch (error) {
        return {
            status: true,
            messsage: 'Error no controlado - contacte al administrador',
            purchase: null,
        }
    }
}
