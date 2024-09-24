'use client';

import { useState } from 'react'
import { IoAdd } from 'react-icons/io5'
import { TablaModal } from './TablaModal'

export const ContainerModal =  () => {

    const [openModal, setOpenModal] = useState(false);
    
    return (
        <>
            <div className="px-2 mt-2 md:top-0 flex justify-center md:justify-start">
                <button
                    className="flex select-none items-center gap-2 rounded bg-green-600 py-2.5 px-4 text-xs font-semibold text-white shadow-md shadow-slate-900/10 transition-all hover:shadow-lg hover:shadow-slate-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    type="button"
                    onClick={() => setOpenModal(true)}
                >
                    <IoAdd className='w-5 h-5'/>
                    Agregar producto
                </button>
            </div>
            <TablaModal openModal={openModal} onCloseModal={() => setOpenModal(false)} />
        </>
    )
}
