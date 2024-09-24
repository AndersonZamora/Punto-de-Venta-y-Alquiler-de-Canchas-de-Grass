'use client';

import Link from 'next/link';
import { useUIStore } from '@/store';
import clsx from 'clsx';
import { IoBarChart, IoBaseballSharp, IoBowlingBall, IoCartOutline, IoCube, IoLogoDropbox, IoPersonOutline, IoPodiumOutline, IoPricetagsOutline, IoStorefrontOutline } from 'react-icons/io5';
import { useSession } from 'next-auth/react';

export const Sidebar = () => {

    const closeMenu = useUIStore(state => state.closeSideMenu);
    const isSideMenuOpen = useUIStore(state => state.isSideMenuOpen);

    const { data: session } = useSession();

    const isAdmin = (session?.user.role === 'admin');

    return (
        <>
            <div onClick={closeMenu} className={
                clsx(
                    'fixed inset-0 z-20 transition-opacity bg-black opacity-50',
                    {
                        'block': isSideMenuOpen,
                        'hidden': !isSideMenuOpen
                    }
                )
            }>

            </div>
            {/* lg:translate-x-0 */}
            <div className={
                clsx(
                    'fixed inset-y-0 left-0 z-20 w-64 overflow-y-auto transition duration-300 transform bg-gray-900  ',
                    {
                        'translate-x-0 ease-out': isSideMenuOpen,
                        '-translate-x-full ease-in': !isSideMenuOpen,
                    }
                )
            } >
                <div className="flex items-center justify-center mt-8">
                    <div className="flex items-center">
                        <img
                            src="/logo.png"
                            className="w-16 h-12"
                            alt={"Logo"}
                        />
                        <span className="mx-2 text-2xl font-semibold text-white">Dashboard</span>
                    </div>
                </div>

                <nav className="mt-10">
                    {
                        isAdmin ? (
                            <>
                                <Link
                                    href="/admin"
                                    onClick={closeMenu}
                                    className="flex items-center px-6 py-2 mt-4 text-gray-100 bg-gray-700 bg-opacity-25" >
                                    <IoBowlingBall className="w-6 h-6" />
                                    <span className="mx-3">Dashboard Admin</span>
                                </Link>
                                <Link
                                    href="/admin/productos"
                                    onClick={closeMenu}
                                    className="flex items-center px-6 py-2 mt-4 text-gray-500 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100">
                                    <IoLogoDropbox className="w-6 h-6" />
                                    <span className="mx-3">Productos</span>
                                </Link>
                                <Link
                                    href="/admin/compras"
                                    onClick={closeMenu}
                                    className="flex items-center px-6 py-2 mt-4 text-gray-500 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100"
                                >
                                    <IoCartOutline className="w-6 h-6" />
                                    <span className="mx-3">Compras</span>
                                </Link>

                                <Link

                                    href="/admin/bodega"
                                    onClick={closeMenu}
                                    className="flex items-center px-6 py-2 mt-4 text-gray-500 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100"
                                >
                                    <IoStorefrontOutline className="w-6 h-6" />
                                    <span className="mx-3">Bodega</span>
                                </Link>
                                <Link
                                    href="/admin/grass"
                                    onClick={closeMenu}
                                    className="flex items-center px-6 py-2 mt-4 text-gray-500 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100"
                                >
                                    <IoBaseballSharp className="w-6 h-6" />
                                    <span className="mx-3">Grass</span>
                                </Link>
                                <Link
                                    href="/admin/ventas"
                                    onClick={closeMenu}
                                    className="flex items-center px-6 py-2 mt-4 text-gray-500 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100"
                                >
                                    <IoPricetagsOutline className="w-6 h-6" />
                                    <span className="mx-3">Ventas</span>
                                </Link>
                                <Link
                                    href="/admin/reportes"
                                    onClick={closeMenu}
                                    className="flex items-center px-6 py-2 mt-4 text-gray-500 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100"
                                >
                                    <IoBarChart className="w-6 h-6" />
                                    <span className="mx-3">Reportes</span>
                                </Link>
                                <Link
                                    href="/admin/usuarios"
                                    onClick={closeMenu}
                                    className="flex items-center px-6 py-2 mt-4 text-gray-500 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100"
                                >
                                    <IoPersonOutline className="w-6 h-6" />
                                    <span className="mx-3">Usuarios</span>
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link
                                    href="/punto"
                                    onClick={closeMenu}
                                    className="flex items-center px-6 py-2 mt-4 text-gray-100 bg-gray-700 bg-opacity-25" >
                                    <IoBowlingBall className="w-6 h-6" />

                                    <span className="mx-3">Dashboard User</span>
                                </Link>
                                <Link
                                    href="/punto/caja"
                                    onClick={closeMenu}
                                    className="flex items-center px-6 py-2 mt-4 text-gray-500 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100">
                                    <IoCube className="w-6 h-6" />
                                    <span className="mx-3">Caja</span>
                                </Link>
                                <Link
                                    href="/punto/bodega"
                                    onClick={closeMenu}
                                    className="flex items-center px-6 py-2 mt-4 text-gray-500 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100">
                                    <IoStorefrontOutline className="w-6 h-6" />
                                    <span className="mx-3">Bodega</span>
                                </Link>

                                <Link
                                    href="/punto/grass"
                                    onClick={closeMenu}
                                    className="flex items-center px-6 py-2 mt-4 text-gray-500 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100">
                                    <IoBaseballSharp className="w-6 h-6" />
                                    <span className="mx-3">Grass</span>
                                </Link>
                                <Link
                                    href="/punto/ventas"
                                    onClick={closeMenu}
                                    className="flex items-center px-6 py-2 mt-4 text-gray-500 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100">
                                    <IoPricetagsOutline className="w-6 h-6" />
                                    <span className="mx-3">Ventas</span>
                                </Link>
                            </>
                        )
                    }
                </nav>
            </div >
        </>
    )
}
