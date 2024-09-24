'use client';

import { useEffect, useState } from 'react';
import { useSaleStore } from '@/store';
import { currencyFormat } from '@/utils';
import { BoletaForm } from './BoletaForm';

export const Resumen = () => {

    const [loading, setLoading] = useState(false);

    const { subsTotal, tax, total } = useSaleStore(state => state.getSummaryInformation());

    const sales = useSaleStore(state => state.sale);

    useEffect(() => {
        setLoading(true);
    }, [])

    return (
        <div className="w-full lg:w-2/5">
            <div className="px-5 mt-5">
                {
                    loading ? (
                        <div className="py-4 rounded-md shadow-lg">
                            <h3 className="text-center font-bold text-xl">Importe</h3>
                            <div className=" px-4 flex justify-between ">
                                <span className="font-semibold text-sm">Subtotal</span>
                                <span className="font-bold">{currencyFormat(subsTotal)}</span>
                            </div>
                            <div className=" px-4 flex justify-between ">
                                <span className="font-semibold text-sm">Igv 18%</span>
                                <span className="font-bold">{currencyFormat(tax)}</span>
                            </div>
                            <div className="border-t-2 border-t-gray-400 mt-3 py-2 px-4 flex items-center justify-between">
                                <span className="font-semibold text-2xl">Total</span>
                                <span className="font-bold text-2xl">{currencyFormat(total)}</span>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-gray-300 animate-pulse h-36">
                            &nbsp;
                        </div>
                    )
                }
 
                <div className="mt-1 p-4 flex flex-col text-gray-700 rounded-md shadow-lg">
                    <BoletaForm sales={sales} />
                </div>
            </div>
        </div>
    )
}
