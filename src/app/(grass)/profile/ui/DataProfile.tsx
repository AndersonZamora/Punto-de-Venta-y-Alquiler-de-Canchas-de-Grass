'use client';

import { LogoutButton } from '@/components';
import { useUserStore } from '@/store'
import { useState } from 'react';
import { IoKeyOutline } from 'react-icons/io5';
import { ModalPassAdmin } from './ModalPassAdmin';

export const DataProfile = () => {

    const user = useUserStore(state => state.user);
    const [openModalPass, setOpenModalPass] = useState(false);

    return (
        <div className="relative flex flex-col break-words bg-white w-full mb-6 shadow-lg rounded ">
            <div className="md:grid grid-cols-4 grid-rows-2  bg-white gap-2 p-4 rounded-xl">
                <div className="md:col-span-1 h-63 shadow-xl ">
                    <div className="flex w-full h-full relative">
                        <img src="/avatar.png" className="w-44 h-44 m-auto" alt="" />
                    </div>
                </div>
                <div className="md:col-span-3 h-63 shadow-xl p-4 space-y-2 ">
                    <div className="flex ">
                        <span
                            className="text-sm border bg-blue-50 font-bold uppercase rounded-l px-4 py-2 whitespace-no-wrap w-full md:w-1/2">
                            Nombre: {user?.name}
                        </span>
                    </div>
                    <div className="flex ">
                        <span
                            className="text-sm font-bold uppercase border-2 rounded-l px-4 py-2 bg-gray-50 whitespace-no-wrap w-full md:w-1/2">
                            Usuario: {user?.username}
                        </span>
                    </div>
                    <div className="flex ">
                        <span
                            className="text-sm font-bold uppercase border-2 rounded-l px-4 py-2 bg-gray-50 whitespace-no-wrap w-full md:w-1/2">
                            Role: {user?.role}
                        </span>
                    </div>
                    {
                        (user?.role === 'admin') && (
                            <>
                                <button
                                    onClick={() => setOpenModalPass(true)}
                                    className="px-2 mt-2 relative flex flex-row  items-center gap-3"
                                >
                                    <IoKeyOutline className="w-6 h-6" />
                                    <span>Cambiar contraseña</span>
                                </button>
                                {<ModalPassAdmin
                                    id={user.id}
                                    openModalPass={openModalPass}
                                    onCloseModalPass={() => setOpenModalPass(false)}
                                />}
                            </>
                        )
                    }
                    <LogoutButton />
                </div>
            </div>
        </div>
    )
}
