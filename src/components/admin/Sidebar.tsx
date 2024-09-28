'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { useUIStore } from '@/store';
import clsx from 'clsx';
import { IoAnalyticsOutline, IoBarChart, IoBaseballSharp, IoBowlingBall, IoCartOutline, IoCube, IoLogoDropbox, IoPersonOutline, IoPricetagsOutline, IoStorefrontOutline } from 'react-icons/io5';

export const Sidebar = () => {

    const currentPath = usePathname();

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
                                    className={
                                        clsx(
                                            'flex items-center px-6 py-2 mt-4 bg-opacity-25',
                                            {
                                                'text-gray-100 bg-gray-700': currentPath === '/admin',
                                                'text-gray-500 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100': currentPath !== '/admin',
                                            }
                                        )
                                    }>
                                    <IoBowlingBall className="w-6 h-6" />
                                    <span className="mx-3">Dashboard</span>
                                </Link>
                                <Link
                                    href="/admin/productos"
                                    onClick={closeMenu}
                                    className={
                                        clsx(
                                            'flex items-center px-6 py-2 mt-4 bg-opacity-25',
                                            {
                                                'text-gray-100 bg-gray-700': currentPath === '/admin/productos',
                                                'text-gray-500 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100': currentPath !== '/admin/productos',
                                            }
                                        )
                                    }>
                                    <IoLogoDropbox className="w-6 h-6" />
                                    <span className="mx-3">Productos</span>
                                </Link>
                                <Link
                                    href="/admin/compras"
                                    onClick={closeMenu}
                                    className={
                                        clsx(
                                            'flex items-center px-6 py-2 mt-4 bg-opacity-25',
                                            {
                                                'text-gray-100 bg-gray-700': currentPath === '/admin/compras',
                                                'text-gray-500 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100': currentPath !== '/admin/compras',
                                            }
                                        )
                                    }>
                                    <IoCartOutline className="w-6 h-6" />
                                    <span className="mx-3">Compras</span>
                                </Link>
                                <Link
                                    href="/admin/ventas"
                                    onClick={closeMenu}
                                    className={
                                        clsx(
                                            'flex items-center px-6 py-2 mt-4 bg-opacity-25',
                                            {
                                                'text-gray-100 bg-gray-700': currentPath === '/admin/ventas',
                                                'text-gray-500 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100': currentPath !== '/admin/ventas',
                                            }
                                        )
                                    }>
                                    <IoCube className="w-6 h-6" />
                                    <span className="mx-3">Caja</span>
                                </Link>
                                <Link
                                    href="/admin/reportes"
                                    onClick={closeMenu}
                                    className={
                                        clsx(
                                            'flex items-center px-6 py-2 mt-4 bg-opacity-25',
                                            {
                                                'text-gray-100 bg-gray-700': currentPath === '/admin/reportes',
                                                'text-gray-500 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100': currentPath !== '/admin/reportes',
                                            }
                                        )
                                    }>
                                    <IoBarChart className="w-6 h-6" />
                                    <span className="mx-3">Reportes</span>
                                </Link>
                                <Link
                                    href="/admin/utilities"
                                    onClick={closeMenu}
                                    className={
                                        clsx(
                                            'flex items-center px-6 py-2 mt-4 bg-opacity-25',
                                            {
                                                'text-gray-100 bg-gray-700': currentPath === '/admin/utilities',
                                                'text-gray-500 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100': currentPath !== '/admin/utilities',
                                            }
                                        )
                                    }>
                                    <IoAnalyticsOutline className="w-6 h-6" />
                                    <span className="mx-3">Utilidades</span>
                                </Link>
                                <Link
                                    href="/admin/usuarios"
                                    onClick={closeMenu}
                                    className={
                                        clsx(
                                            'flex items-center px-6 py-2 mt-4 bg-opacity-25',
                                            {
                                                'text-gray-100 bg-gray-700': currentPath === '/admin/usuarios',
                                                'text-gray-500 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100': currentPath !== '/admin/usuarios',
                                            }
                                        )
                                    }>
                                    <IoPersonOutline className="w-6 h-6" />
                                    <span className="mx-3">Usuarios</span>
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link
                                    href="/punto"
                                    onClick={closeMenu}
                                    className={
                                        clsx(
                                            'flex items-center px-6 py-2 mt-4 bg-opacity-25',
                                            {
                                                'text-gray-100 bg-gray-700': currentPath === '/punto',
                                                'text-gray-500 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100': currentPath !== '/punto',
                                            }
                                        )
                                    } >
                                    <IoBowlingBall className="w-6 h-6" />
                                    <span className="mx-3">Dashboard</span>
                                </Link>
                                <Link
                                    href="/punto/caja"
                                    onClick={closeMenu}
                                    className={
                                        clsx(
                                            'flex items-center px-6 py-2 mt-4 bg-opacity-25',
                                            {
                                                'text-gray-100 bg-gray-700': currentPath === '/punto/caja',
                                                'text-gray-500 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100': currentPath !== '/punto/caja',
                                            }
                                        )
                                    }>
                                    <IoCube className="w-6 h-6" />
                                    <span className="mx-3">Caja</span>
                                </Link>
                                <Link
                                    href="/punto/bodega"
                                    onClick={closeMenu}
                                    className={
                                        clsx(
                                            'flex items-center px-6 py-2 mt-4 bg-opacity-25',
                                            {
                                                'text-gray-100 bg-gray-700': currentPath === '/punto/bodega',
                                                'text-gray-500 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100': currentPath !== '/punto/bodega',
                                            }
                                        )
                                    }>
                                    <IoStorefrontOutline className="w-6 h-6" />
                                    <span className="mx-3">Bodega</span>
                                </Link>
                                <Link
                                    href="/punto/grass"
                                    onClick={closeMenu}
                                    className={
                                        clsx(
                                            'flex items-center px-6 py-2 mt-4 bg-opacity-25',
                                            {
                                                'text-gray-100 bg-gray-700': currentPath === '/punto/grass',
                                                'text-gray-500 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100': currentPath !== '/punto/grass',
                                            }
                                        )
                                    }>
                                    <IoBaseballSharp className="w-6 h-6" />
                                    <span className="mx-3">Grass</span>
                                </Link>
                                <Link
                                    href="/punto/ventas"
                                    onClick={closeMenu}
                                    className={
                                        clsx(
                                            'flex items-center px-6 py-2 mt-4 bg-opacity-25',
                                            {
                                                'text-gray-100 bg-gray-700': currentPath === '/punto/ventas',
                                                'text-gray-500 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100': currentPath !== '/punto/ventas',
                                            }
                                        )
                                    }>
                                    <IoPricetagsOutline className="w-6 h-6" />
                                    <span className="mx-3">Ventas</span>
                                </Link>
                                <Link
                                    href="/punto/productos"
                                    onClick={closeMenu}
                                    className={
                                        clsx(
                                            'flex items-center px-6 py-2 mt-4 bg-opacity-25',
                                            {
                                                'text-gray-100 bg-gray-700': currentPath === '/punto/productos',
                                                'text-gray-500 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100': currentPath !== '/punto/productos',
                                            }
                                        )
                                    }>
                                    <IoLogoDropbox className="w-6 h-6" />
                                    <span className="mx-3">Productos</span>
                                </Link>
                            </>
                        )
                    }
                </nav>
            </div >
        </>
    )
}
