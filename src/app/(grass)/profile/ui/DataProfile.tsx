'use client';

import { LogoutButton } from '@/components';
import { useUserStore } from '@/store'

export const DataProfile = () => {

    const user = useUserStore(state => state.user);

    return (
        <div className="w-full  p-8 bg-white lg:ml-4 shadow-md">

            <div className="flex justify-between">
                {
                    (user?.role === 'admin')
                        ? (
                            <span className="text-xl font-semibold block">
                                Perfil del administrador
                            </span>
                        ) : (
                            <span className="text-xl font-semibold block">
                                Perfil de usuario
                            </span>
                        )
                }
            </div>
            <div className="rounded  shadow p-6">
                <div className="pb-6">
                    <label className="font-semibold text-gray-700 block pb-1">Nombre</label>
                    <div className="flex">
                        <p className="border-1 rounded-r px-4 py-2 w-full">
                            {user?.name}
                        </p>
                    </div>
                </div>
                <div className="pb-6">
                    <label className="font-semibold text-gray-700 block pb-1">Usuario</label>
                    <div className="flex">
                        <p className="border-1 rounded-r px-4 py-2 w-full">
                            {user?.username}
                        </p>
                    </div>
                </div>
                <div className="pb-6">
                    <label className="font-semibold text-gray-700 block pb-1">Rol</label>
                    <div className="flex">
                        <p className="border-1 rounded-r px-4 py-2 w-full">
                            {user?.role}
                        </p>
                    </div>
                </div>
                <div className="pb-4 md:w-2/5">
                    {(user) && <LogoutButton />}
                </div>
            </div>
        </div>
    )
}
