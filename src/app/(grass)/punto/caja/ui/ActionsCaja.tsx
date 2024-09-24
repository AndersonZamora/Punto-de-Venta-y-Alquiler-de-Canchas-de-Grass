'use client';

import { useState } from 'react';
import clsx from 'clsx';
import { IoOpen } from 'react-icons/io5';
import { CashModal } from './CashModal';

interface Props {
    isOpen: boolean;
}

export const ActionsCaja = ({ isOpen }: Props) => {

    const [openModalPrice, setOpenModalPrice] = useState(false);

    return (
        <div className="lg:flex gap-4 items-stretch">
            <button
                onClick={() => setOpenModalPrice(true)}
                className={
                    clsx(
                        'w-full px-6 sm:w-1/2 xl:w-1/3',
                        {
                            'hidden': isOpen,
                            'block': !isOpen,
                        }
                    )
                }
            >
                <div className="flex items-center px-5 py-6 bg-white rounded-md shadow-sm">
                    <div className='p-3 bg-opacity-75 rounded-full bg-green-700'>
                        <IoOpen className='w-8 h-8 text-white' />
                    </div>
                    <div className="mx-5">
                        <h4 className="text-2xl font-semibold text-gray-700">Abrir caja</h4>
                    </div>
                </div>
            </button>
            {
                (openModalPrice) &&
                (<CashModal openModalPrice={openModalPrice} onCloseModal={() => setOpenModalPrice(false)} />)
            }
        </div>
    )
}
