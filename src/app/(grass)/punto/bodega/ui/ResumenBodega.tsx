'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import clsx from 'clsx';
import { registerSale } from '@/actions';
import { useBodegaStore } from '@/store';
import { currencyFormat, errorAlert, loadingAlert, successAlert } from '@/utils';

export const ResumenBodega = () => {

    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const { totalB } = useBodegaStore(state => state.getSummaryInformationB());
    const saleB = useBodegaStore(state => state.saleB);
    const clearSale = useBodegaStore(state => state.clearSale);

    useEffect(() => {
        setLoading(true);
    }, [])

    const handleRegisterSale = async () => {

        loadingAlert('Registrando venta...');

        const { status, message } = await registerSale({ products: saleB })

        if (!status) {
            errorAlert(message);
            return;
        }
        
        clearSale();
        successAlert('Venta registra');
        router.replace('/punto/bodega')
    }

    return (
        <div className="w-full lg:w-2/5">
            <div className="px-5 mt-5">
                {
                    loading ? (
                        <div className="py-4 rounded-md shadow-lg">
                            <h3 className="text-center font-bold text-xl">Total de la venta</h3>

                            <div className="border-t-2 border-t-gray-400 mt-3 py-2 px-4 flex items-center justify-between">
                                <span className="font-semibold text-2xl">Total</span>
                                <span className="font-bold text-2xl">{currencyFormat(totalB)}</span>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-gray-300 animate-pulse h-36">
                            &nbsp;
                        </div>
                    )
                }

                <div className="mt-1 p-4 flex flex-col text-gray-700 rounded-md shadow-lg">
                    <div className="px-5 mt-5">
                        <button
                            disabled={!(saleB.length > 0)}
                            onClick={handleRegisterSale}
                            className={
                                clsx(
                                    'w-full px-4 py-4 rounded-md shadow-lg text-center font-semibold',
                                    {
                                        'bg-gray-900 text-white ': !(saleB.length > 0),
                                        'bg-yellow-500 text-white': (saleB.length > 0),
                                    }
                                )
                            }
                        >
                            Registrar venta
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
