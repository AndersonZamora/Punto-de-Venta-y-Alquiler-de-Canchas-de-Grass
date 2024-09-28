'use server';

import prisma from '@/lib/prisma';
import { separateDateTime, separateDateTimeEnd } from '@/utils';
import { differenceInDays, isAfter } from 'date-fns';

interface Props {
    startTime: string;
    endTime: string;
}

export const getBalanceAll = async ({ startTime, endTime }: Props) => {
    try {

        const startTimeS = separateDateTime(`${startTime}`);
        const endTimeS = separateDateTimeEnd(`${endTime}`);

        if (isAfter(startTimeS, endTimeS)) {
            throw new Error('El tiempo de Inico debe ser antes del tiempo de Fin');
        }

        const interval = differenceInDays(endTimeS, startTimeS);

        if (interval < 1) {
            throw new Error('Debe haber un intervalo mínimo de 1 día entre el Inicio y Fin');
        }

        const reportCahs = await prisma.cashRegister.aggregate({
            _sum: {
                closingBalance: true,
            },
            where: {
                openTime: {
                    gte: startTimeS,
                    lte: endTimeS,
                },
            },
        });

        const reportPurcha = await prisma.purchase.aggregate({
            _sum: {
                total: true,
            },
            where: {
                purchaseDate: {
                    gte: startTimeS,
                    lte: endTimeS,
                },
            },
        });

        return {
            report: {
                reportCahs: reportCahs._sum.closingBalance || 0,
                reportPurcha: reportPurcha._sum.total || 0,
            },
            status: true,
            message: 'Listo'
        }
    } catch (error) {
        if (error instanceof Error) {
            return {
                report: {
                    reportCahs: 0,
                    reportPurcha: 0,
                },
                status: false,
                message: error.message,
            }
        }
        return {
            report: {
                reportCahs: 0,
                reportPurcha: 0,
            },
            status: false,
            message: 'Error no controlado - contacte al administrador',
        }
    }
}
