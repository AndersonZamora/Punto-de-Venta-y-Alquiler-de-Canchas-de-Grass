'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface Props {
    search: string;
    title: string;
}

export const SelectDate = ({ search, title }: Props) => {

    const router = useRouter();
    const [viewDete, setViewDate] = useState('');

    const onChangeSearch = (target: EventTarget & HTMLInputElement) => {
        if (target.value !== '') {
            setViewDate(target.value)
        }
    };

    useEffect(() => {
        if (viewDete !== '') {
            if (search !== viewDete) {
                router.push(`/admin/ventas/?search=${viewDete}`);
            }
        }
    }, [viewDete])

    return (
        <div className='px-4 md:px-0 w-full flex flex-col items-center'>
            <div className=' w-full md:w-3/6'>
                <h3 className="mt-3">{title}</h3>
                <input
                    type='date'
                    className="bg-white w-full pr-11 h-10 pl-3 py-2 bg-transparent placeholder:text-slate-700 text-slate-700 text-sm border border-slate-400 rounded transition duration-200 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md"
                    placeholder="Buscar por fecha..."
                    value={viewDete}
                    onChange={value => onChangeSearch(value.target)}
                />
            </div>
        </div>
    )
}
