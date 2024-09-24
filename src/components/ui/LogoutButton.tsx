'use client';

import { logout } from '@/actions';

export const LogoutButton = () => {

    const handlerLogout = async () => {
        await logout();
    }

    return (
        <div className="w-full mt-6">
            <button
                onClick={() => handlerLogout()}
                className="flex text-center items-center justify-center w-full pt-4 pr-10 pb-4 pl-10 text-base
          font-medium text-white bg-indigo-600 rounded-xl transition duration-500 ease-in-out transform
          hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Cerrar sesión
            </button>
        </div>
    )
}
