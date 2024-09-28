'use client';

import { useState } from 'react';
import clsx from 'clsx';
import { IoReaderOutline } from 'react-icons/io5';
import { capitalize } from '@/utils';

interface Props {
    description: string;
}

export const ViewDetailA = ({ description }: Props) => {

    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button
                onMouseEnter={() => setIsOpen(true)}
                onMouseLeave={() => setIsOpen(false)}
                className="text-gray-800 hover:bg-gray-200 font-bold p-2 rounded transition-colors duration-300">
                <IoReaderOutline className='w-[1.5em] h-[1.5em]' />
            </button>

            <div
                className={
                    clsx(
                        'fade-in popover absolute bg-black border shadow-md mt-2 px-4 py-2 rounded-lg',
                        {
                            'hidden': !isOpen,
                            'block': isOpen
                        }
                    )
                }
            >
                <p className="text-white">
                    {capitalize(description)}
                </p>
            </div>
        </>
    )
}
