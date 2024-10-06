'use client';

import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { IoAdd, IoCloseCircleOutline, IoSearch } from 'react-icons/io5';
import { useSaleStore } from '@/store';
import { getProducts } from '@/actions';
import { IProduct } from '@/interfaces';
import { ModalPrice } from './ModalPrice';
import { LoadingPage, PaginationModal } from '@/components';

interface Props {
    openModal: boolean;
    onCloseModal: () => void;
}

export const TablaModal = ({ openModal, onCloseModal }: Props) => {

    const [openModalPrice, setOpenModalPrice] = useState(false);
    const setProductView = useSaleStore(state => state.setProductView);
    const productView = useSaleStore(state => state.productView);
    const [productsGet, setProductsGet] = useState<IProduct[]>([]);
    const [fillProducts, setFillProducts] = useState<IProduct[]>([]);
    const [totalPagesv, setTotalPagesv] = useState(1);
    const [loading, setLoading] = useState(true);
    const [dateSearch, setDateSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    const handlePageChange = async (page: number) => {
        if (currentPage != page) {
            setLoading(true);
            setCurrentPage(page);
            const { products, totalPages } = await getProducts({ page: page, search: '' });
            setTotalPagesv(totalPages);
            setProductsGet(products);
            setFillProducts(products);
            setLoading(false);
        }
    }

    const selectProduct = (product: IProduct) => {
        setProductView(product);
        setOpenModalPrice(true);
    }

    const handleGetProduct = async () => {
        const { products, totalPages } = await getProducts({ page: totalPagesv, search: '' });
        setFillProducts(products);
        setTotalPagesv(totalPages);
        setProductsGet(products);
        setLoading(false);
    }

    const onChangeSearch = (target: EventTarget & HTMLInputElement) => {
        setDateSearch(target.value);
        if (target.value !== '') {
            setFillProducts(productsGet.filter(p => p.description.toLocaleLowerCase().includes(target.value.toLocaleLowerCase())))
        } else {
            setFillProducts(productsGet);
        }
    };

    const handleOnSubmit = (nativeEvent: Event) => {
        nativeEvent.preventDefault();
        setDateSearch('');
        handleActionSearch(dateSearch);
    }

    const handleActionSearch = async (data: string) => {
        setLoading(true);
        const slug = data.trim().replaceAll(' ', '_').toLocaleLowerCase();
        const { products, totalPages } = await getProducts({ page: 1, search: slug });
        setCurrentPage(1);
        setFillProducts(products);
        setTotalPagesv(totalPages);
        setProductsGet(products);
        setLoading(false);
    }

    const hanldeOnCloseModal = () => {
        onCloseModal();
        setTotalPagesv(1);
        setCurrentPage(1);
    }

    useEffect(() => {
        if (openModal) {
            handleGetProduct();
        }
    }, [openModal]);

    return (
        <div className={
            clsx(
                'fade-in px-1 md:px-0 fixed left-0 top-0 flex h-full z-40 w-full items-center justify-center bg-black bg-opacity-50 py-10',
                { 'invisible': !openModal }
            )
        }>
            <div className="max-h-full w-full mr:0 md:mr-1 md:max-w-5xl overflow-y-auto rounded-2xl bg-white">
                <div className="w-full ">
                    <header className="flex items-center justify-between p-2 border-b-2 border-gray-400">
                        <h2 className="font-semibold" id="exampleHeader">Lista de Productos</h2>
                        <button
                            onClick={hanldeOnCloseModal}
                            className="transition-colors hover:bg-gray-50 focus:ring focus:outline-none p-2 rounded-full"
                        >
                            <IoCloseCircleOutline className='w-6 h-6' />
                        </button>
                    </header>

                    <div className="p-2 text-center">
                        <div className="flex flex-col md:flex-row items-center justify-between mb-5">
                            <div className="w-full max-w-sm min-w-[200px] relative">
                                <form onSubmit={(value) => handleOnSubmit(value.nativeEvent)} noValidate  autoComplete='off'>
                                    <input
                                        disabled={loading}
                                        name='search'
                                        value={dateSearch}
                                        className="bg-white w-full pr-11 h-10 pl-3 py-2 bg-transparent placeholder:text-slate-700 text-slate-700 text-sm border border-slate-400 rounded transition duration-200 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md"
                                        placeholder="Buscar producto..."
                                        onChange={value => onChangeSearch(value.target)}
                                    />
                                    <button
                                        className="absolute h-8 w-8 right-1 top-1 my-auto px-2 flex items-center bg-white rounded "
                                        type="submit"
                                        disabled={loading}
                                    >
                                        <IoSearch className="w-8 h-8 text-slate-600" />
                                    </button>
                                </form>
                            </div>
                        </div>
                        <div className="relative flex flex-col w-full h-full overflow-scroll text-gray-700 bg-white shadow-md rounded-lg bg-clip-border">

                            {
                                (loading) ? (<LoadingPage />)
                                    : (
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
                                                            Precio Compra
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
                                            <tbody className='fade-in'>
                                                {
                                                    fillProducts.map(product => (
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
                                                                <p className="text-center text-md text-black">{product.purchasePrice}</p>
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
                                    )
                            }
                            <PaginationModal totalPages={totalPagesv} onPageChange={handlePageChange} currentPage={currentPage} />
                        </div>
                    </div>
                </div>
            </div>
            {
                productView && (
                    <ModalPrice openModalPrice={openModalPrice} onCloseModalPrice={() => setOpenModalPrice(false)} productView={productView} />
                )
            }
        </div>
    )
}
