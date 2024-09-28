'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { IoEye, IoReloadOutline } from 'react-icons/io5';
import { LoadingPage, Pagination } from '@/components';
import { IPurchase } from '@/interfaces';
import { capitalize, closeAlert, currencyFormat, loadingAlert } from '@/utils';

interface Props {
    purchases: IPurchase[];
    totalPages: number;
}

export const TablaCompra = ({ purchases, totalPages }: Props) => {

    const router = useRouter();
    const [dateSelect, setDateSelect] = useState('');
    const [loading, setLoading] = useState(true);

    const onChangeSearch = (target: EventTarget & HTMLInputElement) => {
        loadingAlert('Buscando compras...');
        setDateSelect(target.value);
        router.replace(`/admin/compras/?search=${target.value}`);
    };

    const hanldeClear = () => {
        if (dateSelect !== '') {
            loadingAlert('Buscando compras...');
            setDateSelect('');
            router.replace('/admin/compras');
        }
    }

    useEffect(() => {
        closeAlert();
    }, [purchases])

    useEffect(() => {
        setLoading(false);
    }, []);

    return (
        <>
            {
                (loading) ?
                    (<LoadingPage />)
                    : (
                        <>
                            <div className="flex flex-col md:flex-row items-center justify-between mb-5 mt-5">
                                <div className="w-full max-w-sm min-w-[200px] relative">
                                    <div className="relative">
                                        <input
                                            type='date'
                                            className="bg-white w-full pr-11 h-10 pl-3 py-2 bg-transparent placeholder:text-slate-700 text-slate-700 text-sm border border-slate-400 rounded transition duration-200 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md"
                                            placeholder="Buscar compra por fecha..."
                                            value={dateSelect}
                                            onChange={value => onChangeSearch(value.target)}
                                        />
                                        <button
                                            className="absolute h-8 w-8 right-1 top-1 my-auto px-2 flex items-center bg-white rounded "
                                            type="button"
                                            onClick={() => hanldeClear()}
                                        >
                                            <IoReloadOutline className="w-8 h-8 text-red-600" />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="relative flex flex-col w-full h-full overflow-scroll text-gray-700 bg-white shadow-md rounded-lg bg-clip-border">
                                <table className="w-full text-left table-auto min-w-max">
                                    <thead>
                                        <tr>
                                            <th className="p-4 border-b border-slate-200 bg-slate-50">
                                                <p className="block font-semibold text-sm leading-none text-black">
                                                    Fecha y Hora
                                                </p>
                                            </th>
                                            <th className="p-4 border-b border-slate-200 bg-slate-50">
                                                <p className="text-center text-sm block font-semibold leading-none ttext-black">
                                                    Total
                                                </p>
                                            </th>
                                            <th className="p-4 border-b border-slate-200 bg-slate-50">
                                                <p className="text-center text-sm block font-semibold leading-none ttext-black">
                                                    N° documento
                                                </p>
                                            </th>
                                            <th
                                                className="p-4 transition-colors cursor-pointer border-y border-slate-200 bg-slate-50 hover:bg-slate-100">
                                                <p
                                                    className="flex items-center justify-between gap-2 font-sans text-sm  font-normal leading-none ttext-black">
                                                </p>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            purchases.map((purcha) => (
                                                <tr key={purcha.id} className="hover:bg-slate-50 border-b border-slate-200">
                                                    <td className="p-4 py-5">
                                                        <p className="text-md text-black">
                                                            {capitalize(purcha.purchaseDate)}
                                                        </p>
                                                    </td>
                                                    <td className="p-4 py-5">
                                                        <p className="text-center text-md text-black">
                                                            {currencyFormat(purcha.total)}
                                                        </p>
                                                    </td>
                                                    <td className="p-4 py-5">
                                                        <p className="text-center text-md text-black">{purcha.documentNumber}</p>
                                                    </td>
                                                    <td className="p-4 py-5">
                                                        <Link
                                                            className="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-slate-900 transition-all hover:bg-slate-900/10 active:bg-slate-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                                            type="button"
                                                            href={`/admin/compras/${purcha.id}`}
                                                        >
                                                            <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                                                                <IoEye className="w-4 h-4" />
                                                            </span>
                                                        </Link>
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                                <Pagination totalPages={totalPages} />
                            </div>
                        </>
                    )
            }
        </>
    )
}
