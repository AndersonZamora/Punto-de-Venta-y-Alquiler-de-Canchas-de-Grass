'use client';

import { useState } from 'react'
import { IoEye } from 'react-icons/io5';
import { currencyFormat, normalizeDate } from '@/utils';
import { ModalDetailA } from './ModalDetailA';

interface Product {
    id: string
    name: string;
    quantity: number;
    price: number;
    total: number;
}

interface IVenta {
    id: string;
    total: number;
    saleTime: Date;
    openedBy: string;
    closedBy: string | null;
    products: Product[]
}

interface Props {
    ventas: IVenta[]
}

export const TablaBodega = ({ ventas }: Props) => {

    const [openRow, setOpenRow] = useState(false);
    const [detail, setdetail] = useState<Product[]>([]);

    const toggleRow = (data: Product[]) => {
        setdetail(data)
        setOpenRow(true);
    };

    return (
        <>
            <table className="w-full text-left table-auto min-w-max">
                <thead>
                    <tr>
                        <th className="p-4 border-b border-slate-200 bg-slate-50">
                            <p className="block text-center font-semibold text-sm leading-none text-black">
                                Total
                            </p>
                        </th>
                        <th className="p-4 border-b border-slate-200 bg-slate-50">
                            <p className="text-center text-sm block font-semibold leading-none ttext-black">
                                Fecha
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
                        ventas.map(product => (
                            <tr key={product.id} className="hover:bg-slate-50 border-b border-slate-200">
                                <td className="p-4 py-5">
                                    <p className="text-center text-md text-black">
                                        {currencyFormat(product.total)}
                                    </p>
                                </td>
                                <td className="p-4 py-5">
                                    <p className="text-center text-md text-black">
                                        {normalizeDate(product.saleTime)} 
                                    </p>
                                </td>
                                <td className="p-4 py-5">
                                    <button
                                        className="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-slate-900 transition-all hover:bg-slate-900/10 active:bg-slate-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                        type="button"
                                        onClick={() => toggleRow(product.products)}
                                    >
                                        <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                                            <IoEye className="w-4 h-4" />
                                        </span>
                                    </button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            {detail?.length > 0 && (
                <ModalDetailA products={detail} openRow={openRow} onCloseModalDeatil={() => setOpenRow(false)} />
            )}
        </>
    )
}
