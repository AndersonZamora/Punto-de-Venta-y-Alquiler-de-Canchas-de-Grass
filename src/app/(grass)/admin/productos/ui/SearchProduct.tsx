'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { IoSearch } from 'react-icons/io5';
import { TableProduct } from './TableProduct';
import { IProduct } from '@/interfaces';
import { LoadingPage, Pagination } from '@/components';
import { closeAlert, loadingAlert } from '@/utils';

interface Props {
    listProducts: IProduct[];
    totalPages: number;
}

export const SearchProduct = ({ listProducts, totalPages }: Props) => {

    const router = useRouter();
    const [fillProducts, setFillProducts] = useState<IProduct[]>(listProducts);
    const [dateSearch, setDateSearch] = useState('');
    const [loading, setLoading] = useState(true);

    const onChangeSearch = (target: EventTarget & HTMLInputElement) => {
        setDateSearch(target.value);
        if (target.value !== '') {
            setFillProducts(listProducts.filter(p => p.description.toLocaleLowerCase().includes(target.value.toLocaleLowerCase())))
        } else {
            setFillProducts(listProducts);
        }
    };

    const handleOnSubmit = (nativeEvent: Event) => {
        nativeEvent.preventDefault();
        setDateSearch('');
        setFillProducts([]);
        handleActionSearch(dateSearch);
    }

    const handleActionSearch = (data: string) => {
        loadingAlert('Buscando...');
        const slug = data.trim()
            .replaceAll(' ', '_')
            .toLocaleLowerCase();

        if (slug !== '') {
            router.replace(`/admin/productos/?search=${slug}`);
            return;
        }

        router.replace(`/admin/productos`)
    }

    useEffect(() => {
        setFillProducts(listProducts);
        closeAlert();
    }, [listProducts]);

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
                                        <form onSubmit={(value) => handleOnSubmit(value.nativeEvent)} noValidate>
                                            <input
                                                name='search'
                                                value={dateSearch}
                                                className="bg-white w-full pr-11 h-10 pl-3 py-2 bg-transparent placeholder:text-slate-700 text-slate-700 text-sm border border-slate-400 rounded transition duration-200 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md"
                                                placeholder="Buscar producto..."
                                                onChange={value => onChangeSearch(value.target)}
                                            />
                                            <button
                                                className="absolute bg-blue-600 h-8 w-8 right-1 top-1 my-auto px-2 flex items-center rounded "
                                                type="submit"
                                            >
                                                <IoSearch className="w-8 h-8 text-white" />
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <div className="relative flex flex-col w-full h-full overflow-scroll text-gray-700 bg-white shadow-md rounded-lg bg-clip-border">
                                <TableProduct products={fillProducts} />
                                <Pagination totalPages={totalPages} />
                            </div>
                        </>
                    )
            }
        </>
    )
}
