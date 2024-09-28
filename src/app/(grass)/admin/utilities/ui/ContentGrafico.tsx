'use client';

import { useEffect, useState } from 'react';
import { LineChartComponent, LoadingPage } from '@/components';
import { processUtilitysForChart } from '@/utils';

interface CashBalanceData {
    labels: string[]; //* Fechas de los días
    datasets: {
        label: string;
        data: number[]; //* Valores del balance (apertura o cierre)
        borderColor: string; //* Color de la línea
        fill: boolean;
    }[];
}

interface Props {
    utilitys: {
        id: string;
        total: number;
        startTime: Date;
        endTime: Date;
    }[]
}

export const ContentGrafico = ({ utilitys }: Props) => {

    const [cashBalance, setCashBalance] = useState<CashBalanceData>();

    useEffect(() => {
        const process = processUtilitysForChart(utilitys);
        setCashBalance(process)
    }, []);

    return (
        <>
            {
                (cashBalance) ?
                    (<LineChartComponent
                        data={cashBalance}
                        title={'Evolución de la utilidad'}
                    />)
                    : (<LoadingPage />)
            }
        </>
    )
}
