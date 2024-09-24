'use client'

import { useState } from 'react';
import clsx from 'clsx';
import { IoAdd, IoCloseCircleOutline, IoSearch } from 'react-icons/io5';
import { IProductPun } from '@/interfaces';
import { useBodegaStore } from '@/store';
import { BodegaModalPrice } from './BodegaModalPrice';
import { PaginationModal } from '@/components';

interface Props {
    products: IProductPun[];
    totalPages: number;
}

const ITEMS_PER_PAGE = 5;

export const BodegaContainerModal = ({ products, totalPages }: Props) => {

    const setProductViewB = useBodegaStore(state => state.setProductViewB);
    const productViewB = useBodegaStore(state => state.productViewB);
    const [openModal, setOpenModal] = useState(false);
    const [openModalPrice, setOpenModalPrice] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');

    const selectProduct = (product: IProductPun) => {
        setProductViewB({
            ...product,
            quantity: 1,
        });
        setOpenModalPrice(true);
    }

    const onChangePage = (page: number) => {
        setCurrentPage(page);
    }

    const filteredProducts = products.filter((product) =>
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const selectedProducts = filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    return (
        <>
            <div className="px-2 mt-2 md:top-0 flex justify-center md:justify-start">
                <button
                    className="flex select-none items-center gap-2 rounded bg-green-600 py-2.5 px-4 text-xs font-semibold text-white shadow-md shadow-slate-900/10 transition-all hover:shadow-lg hover:shadow-slate-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    type="button"
                    
                    onClick={() => setOpenModal(true)}
                >
                    <IoAdd className='w-5 h-5' />
                    Agregar producto
                </button>
            </div>
            <div className={
                clsx(
                    'fade-in px-1 md:px-0 fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50 py-10',
                    { 'invisible': !openModal }
                )
            }>
                <div className="max-h-full w-full md:max-w-4xl overflow-y-auto sm:rounded-2xl bg-white">
                    <div className="w-full">
                        <header className="flex items-center justify-between p-2 border-b-2 border-gray-400">
                            <h2 className="font-semibold" id="exampleHeader">Lista de Productos</h2>
                            <button
                                onClick={() => setOpenModal(false)}
                                className="transition-colors hover:bg-gray-50 focus:ring focus:outline-none p-2 rounded-full"
                            >
                                <IoCloseCircleOutline className='w-6 h-6' />
                            </button>
                        </header>

                        <div className="p-2 text-center">
                            <div className="flex flex-col md:flex-row items-center justify-between mb-5">
                                <div className="w-full max-w-sm min-w-[200px] relative">
                                    <div className="relative">
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
                            <div className="relative flex flex-col w-full h-full overflow-scroll text-gray-700 bg-white shadow-md rounded-lg bg-clip-border">
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
                                            selectedProducts.map(product => (
                                                <tr key={product.id} className="hover:bg-slate-50 border-b border-slate-200">
                                                    <td className="p-4 py-5">
                                                        <p className="text-md text-black">
                                                            {product.description}
                                                        </p>
                                                    </td>
                                                    <td className="p-4 py-5">
                                                        <div
                                                            className="relative grid items-center px-2 py-1 font-sans text-md font-bold text-green-900 uppercase rounded-md select-none whitespace-nowrap bg-green-500/20">
                                                            <span className="text-center ">{product.stock}</span>
                                                        </div>
                                                    </td>
                                                    <td className="p-4 py-5">
                                                        <p className="text-center text-md text-black">{product.salePrice}</p>
                                                    </td>
                                                    <td className="p-4 py-5">
                                                        <button
                                                            onClick={() => selectProduct(product)}
                                                            className="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-slate-900 transition-all hover:bg-slate-900/10 active:bg-slate-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                                            type="button">
                                                            <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                                                                <IoAdd className="w-4 h-4" />
                                                            </span>
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        }

                                    </tbody>
                                </table>
                                <PaginationModal totalPages={totalPages} currentPage={currentPage} onPageChange={onChangePage} />
                            </div>
                        </div>
                    </div>
                </div>
                {
                    productViewB && (
                        <BodegaModalPrice openModalPrice={openModalPrice} onCloseModalPrice={() => setOpenModalPrice(false)} productView={productViewB} />
                    )
                }
            </div>
        </>
    )
}
