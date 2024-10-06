'use client';

import { logout } from '@/actions';
import { useBodegaStore, useSaleStore, useUserStore } from '@/store';

export const LogoutButton = () => {

    const clearCart = useSaleStore(state => state.clearCart);
    const clearSale = useBodegaStore(state => state.clearSale);
    const clearUser = useUserStore(state => state.clearUser);

    const handlerLogout = async () => {
        clearCart();
        clearSale();
        clearUser();
        await logout();
    }

    return (
        <div className="flex">
            <button
                onClick={() => handlerLogout()}
                className="px-3 mt-3 py-1 h-12 w-full md:w-1/2 shadow-lg shadow-gray-500/50 bg-red-700 text-white rounded-lg text-[15px] cursor-pointer active:scale-[.97]"
            >
                Cerrar sesión
            </button>
        </div>
    )
}
