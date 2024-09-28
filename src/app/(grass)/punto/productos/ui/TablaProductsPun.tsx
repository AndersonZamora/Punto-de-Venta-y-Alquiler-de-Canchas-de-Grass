'use client';

import { useState } from 'react';
import { PaginationModal } from '@/components';
import { IProductPun } from '@/interfaces';
import { capitalize, currencyFormat } from '@/utils';
import { IoSearch } from 'react-icons/io5';

interface Props {
    products: IProductPun[];
    totalPages: number;
}

const ITEMS_PER_PAGE = 10;

export const TablaProductsPun = ({ totalPages, products }: Props) => {

    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredProducts = products.filter((product) =>
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const selectedProducts = filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    const onChangePage = (page: number) => {
        setCurrentPage(page);
    }

    return (
        <>
            <div className="px-1">
                <div className="flex flex-col md:flex-row items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-semibold mb-2 text-blue-600">Lista de productos</h2>
                    </div>
                    <div className='relative w-full md:w-2/6'>
                        <input
                            className="bg-white w-full pr-11 h-10 pl-3 py-2 bg-transparent placeholder:text-slate-700 text-slate-700 text-sm border border-slate-400 rounded transition duration-200 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md"
                            placeholder="Buscar producto..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button
                            className="absolute h-8 w-8 right-1 top-1 my-auto px-2 flex items-center bg-white rounded "
                            type="button"
                        >
                            <IoSearch className="w-8 h-8 text-slate-600" />
                        </button>
                    </div>
                </div>
            </div>
            <div className="relative mt-3 flex flex-col w-full h-full overflow-scroll text-gray-700 bg-white shadow-md rounded-lg bg-clip-border">
                <table className="w-full text-left table-auto min-w-max">
                    <thead>
                        <tr>
                            <th className="p-4 border-b border-slate-200 bg-slate-50">
                                <p className="block font-semibold text-sm leading-none text-black">
                                    Producto
                                </p>
                            </th>
                            <th className="p-4 border-b border-slate-200 bg-slate-50">
                                <p className="text-center text-sm block font-semibold leading-none ttext-black">
                                    Stock
                                </p>
                            </th>
                            <th className="p-4 border-b border-slate-200 bg-slate-50">
                                <p className="text-center text-sm block font-semibold leading-none ttext-black">
                                    Precio venta
                                </p>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            selectedProducts.map(product => (
                                <tr key={product.id} className="hover:bg-slate-50 border-b border-slate-200">
                                    <td className="p-4 py-5">
                                        <p className="text-md text-black">
                                            {capitalize(product.description)}
                                        </p>
                                    </td>
                                    <td className="p-4 py-5">
                                        <div
                                            className="relative grid items-center px-2 py-1 font-sans text-md font-bold text-green-900 uppercase rounded-md select-none whitespace-nowrap bg-green-500/20">
                                            <span className="text-center ">{product.stock}</span>
                                        </div>
                                    </td>
                                    <td className="p-4 py-5">
                                        <p className="text-center text-md text-black">{currencyFormat(product.salePrice)}</p>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                <PaginationModal totalPages={totalPages} currentPage={currentPage} onPageChange={onChangePage} />
            </div>
        </>
    )
}
