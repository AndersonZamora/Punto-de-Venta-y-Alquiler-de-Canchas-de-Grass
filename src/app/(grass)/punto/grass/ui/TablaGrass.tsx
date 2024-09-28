'use client';

import { useState } from 'react';
import { IoSearch } from 'react-icons/io5';
import { PaginationModal } from '@/components';
import { IRental } from '@/interfaces/IRental';
import { capitalize, currencyFormat, separateDateTimeView } from '@/utils';
import { ViewDetail } from './ViewDetail';
import { AddComentarios } from './AddComentarios';

interface Props {
    rentals: IRental[],
    totalPages: number;
}

const ITEMS_PER_PAGE = 10;

export const TablaGrass = ({ rentals, totalPages }: Props) => {

    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');

    const onChangePage = (page: number) => {
        setCurrentPage(page);
    }

    const filteredProducts = rentals.filter((rental) =>
        rental.documentDni.toLowerCase().includes(searchTerm.toLowerCase()) ||
        rental.phone.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const selectedRental = filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    return (
        <>
            <div className="flex flex-col md:flex-row items-center justify-between mb-5">
                <div className="w-full max-w-sm min-w-[200px] relative">
                    <div className="relative">
                        <input
                            className="bg-white w-full pr-11 h-10 pl-3 py-2 bg-transparent placeholder:text-slate-700 text-slate-700 text-sm border border-slate-400 rounded transition duration-200 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md"
                            placeholder="Buscar por celular..."
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
            <div className="relative flex flex-col w-full h-full overflow-scroll text-gray-700 bg-white shadow-md rounded-lg bg-clip-border">
                <table className="w-full text-left table-auto min-w-max">
                    <thead>
                        <tr>
                            <th className="p-4 border-b border-slate-200 bg-slate-50">
                                <p className="block text-center font-semibold text-sm leading-none text-black">
                                    Nombre
                                </p>
                            </th>
                            <th className="p-4 border-b border-slate-200 bg-slate-50">
                                <p className="block text-center font-semibold text-sm leading-none text-black">
                                    DNI
                                </p>
                            </th>
                            <th className="p-4 border-b border-slate-200 bg-slate-50">
                                <p className="text-center text-sm block font-semibold leading-none ttext-black">
                                    Celular
                                </p>
                            </th>
                            <th className="p-4 border-b border-slate-200 bg-slate-50">
                                <p className="text-center text-sm block font-semibold leading-none ttext-black">
                                    Ingreso
                                </p>
                            </th>
                            <th className="p-4 border-b border-slate-200 bg-slate-50">
                                <p className="text-center text-sm block font-semibold leading-none ttext-black">
                                    Salida
                                </p>
                            </th>
                            <th className="p-4 border-b border-slate-200 bg-slate-50">
                                <p className="text-center text-sm block font-semibold leading-none ttext-black">
                                    Total
                                </p>
                            </th>
                            <th className="p-4 border-b border-slate-200 bg-slate-50">
                                <p className="text-center text-sm block font-semibold leading-none ttext-black">
                                    Comentarios
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
                            selectedRental.map(rental => (
                                <tr key={rental.id} className="hover:bg-slate-50 border-b border-slate-200">
                                    <td className="p-4 py-5">
                                        <p className="text-center text-md text-black">
                                            {capitalize(rental.customerName)}
                                        </p>
                                    </td>
                                    <td className="p-4 py-5">
                                        <p className="text-center text-md text-black">
                                            {rental.documentDni}
                                        </p>
                                    </td>
                                    <td className="p-4 py-5">
                                        <p className="text-center text-md text-black">
                                            {rental.phone}
                                        </p>
                                    </td>
                                    <td className="p-4 py-5">
                                        <p className="text-center text-md text-black">
                                            {separateDateTimeView(rental.startTime)}
                                        </p>
                                    </td>
                                    <td className="p-4 py-5">
                                        <p className="text-center text-md text-black">
                                            {separateDateTimeView(rental.endTime)}
                                        </p>
                                    </td>
                                    <td className="p-4 py-5">
                                        <p className="text-center text-md text-black">
                                            {currencyFormat(rental.total)}
                                        </p>
                                    </td>
                                    <td className="p-4 py-5 text-center">
                                        <ViewDetail description={rental.description || '-'} />
                                    </td>
                                    <td className='className="p-4 py-5"'>
                                        <AddComentarios data={{ id: rental.id, description: rental.description || '-' }} />
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
