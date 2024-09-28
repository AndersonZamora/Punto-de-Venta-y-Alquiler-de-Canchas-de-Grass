'use client';

import { cashStatus } from '@/actions';
import { capitalize, closeAlert, currencyFormat, dateServerSale, dateServerStart, errorAlert, loadingAlert, normalizeDate } from '@/utils';
import React, { useState } from 'react'
import { useEffect } from 'react';
import Link from 'next/link';

interface ICaja {
    id: string;
    openedBy: string;
    closedBy: string | null;
    openTime: Date;
    closeTime: Date | null;
    openingBalance: number;
    closingBalance: number;
    totalSales: number;
    totalRentals: number;
    totalExpenses: number;
    status: boolean;
}

interface IGastos {
    id: string;
    description: string;
    amount: number;
    expenseTime: string;
}

export const ContentCaja = () => {

    const [cashRegis, setCashRegis] = useState<ICaja | null>();
    const [gastosg, setGastosg] = useState<IGastos[]>([]);
    const [subTotalg, setSubTotalG] = useState(0);
    const [viewDete, setViewDate] = useState('');
    const [startTime, setDateInit] = useState('');

    const handleCajas = async () => {
        loadingAlert('Cargando caja...');
        const { cashRegister, gastos, subTotal, status, message } = await cashStatus({ search: startTime });

        if (!status) {
            errorAlert(message);
            setCashRegis(null)
            return;
        }

        closeAlert();
        setSubTotalG(subTotal);
        setGastosg(gastos);
        setCashRegis(cashRegister);
    }

    const onChangeSearch = (target: EventTarget & HTMLInputElement) => {
        if (target.value !== '') {
            setViewDate(target.value)
            setDateInit(new Date(target.value).toISOString());
            setSubTotalG(0);
            setGastosg([]);
            setCashRegis(null);
        }
    };

    useEffect(() => {
        if (startTime !== '') {
            handleCajas()
        }
    }, [startTime])

    useEffect(() => {
        setDateInit(dateServerStart())
    }, [])

    return (
        <div className="px-2 md:px-5 fade-in">
            {
                (cashRegis) ?
                    (
                        <>
                            <div className=" relative overflow-hidden text-slate-700 rounded-none bg-clip-border">
                                <h3 className="text-lg font-semibold text-slate-800">Reporte de caja del día: {normalizeDate(cashRegis.openTime)} </h3>
                                <h3 className="text-lg font-semibold text-slate-800">
                                    Estado de la caja: {cashRegis.status ? 'Abierta' : 'Cerrada'}
                                </h3>
                                {
                                    cashRegis.closeTime && (
                                        <h3 className="text-lg font-semibold text-slate-800">
                                            Fecha de cierre: {normalizeDate(cashRegis.closeTime)}
                                        </h3>
                                    )
                                }
                                {
                                    cashRegis.closedBy && (
                                        <h3 className="text-lg font-semibold text-slate-800">
                                            Usuario que cerro caja: {cashRegis.closedBy}
                                        </h3>
                                    )
                                }
                            </div>
                            <div className="bg-white rounded-xl mt-4">
                                <div className='px-4 md:px-0 w-full flex flex-col items-center'>
                                    <div className=' w-full md:w-3/6'>
                                        <h3 className="mt-3">Seleccionar otra caja</h3>
                                        <input
                                            type='date'
                                            className="bg-white w-full pr-11 h-10 pl-3 py-2 bg-transparent placeholder:text-slate-700 text-slate-700 text-sm border border-slate-400 rounded transition duration-200 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md"
                                            placeholder="Buscar por fecha..."
                                            value={viewDete}
                                            onChange={value => onChangeSearch(value.target)}
                                        />
                                    </div>
                                </div>
                                <div className="p-3 grid items-center grid-cols-1 md:grid-cols-2 gap-1 mt-5">
                                    <div className="py-4 rounded-md shadow-lg">
                                        <div className="border-t-2 border-t-gray-400 flex flex-col items-center">
                                            <span className="font-semibold text-xl mt-1">Responsable</span>
                                            <span className="font-bold text-xl">{cashRegis.openedBy}</span>
                                        </div>
                                    </div>
                                    <div className="py-4 rounded-md shadow-lg">
                                        <div className="flex flex-col items-center border-t-2 border-t-gray-400 font-semibold">
                                            <span className="text-xl mt-2">Fecha de apertura</span>
                                            <span className="font-bold text-md">{normalizeDate(cashRegis?.openTime || new Date())}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-3 grid items-center grid-cols-1 md:grid-cols-2 gap-1 mx-auto mt-1">
                                    <div className="py-4  rounded-md shadow-lg">
                                        <h3 className="text-center font-bold text-xl">Ingresos</h3>
                                        <Link
                                            className="px-2 md:px-4 flex justify-between mt-2"
                                            href={`/admin/bodega/${cashRegis.id}`}
                                        >
                                            <span className="font-semibold text-xl">Total de ventas</span>
                                            <span className="flex gap-2 font-bold text-xl">
                                                {currencyFormat(cashRegis.totalSales)}
                                            </span>
                                        </Link>
                                        <Link
                                            className="px-2 md:px-4 flex justify-between"
                                            href={`/admin/grass/${cashRegis.id}`}
                                        >
                                            <span className="font-semibold text-xl">Total de alquiler</span>
                                            <span className="flex gap-2 font-bold text-xl">
                                                {currencyFormat(cashRegis.totalRentals || 0)}
                                            </span>
                                        </Link>
                                        <div className="px-2 md:px-4 justify-between hidden md:flex">
                                            <span className="font-semibold text-xl">&nbsp;</span>
                                        </div>
                                        <div className="border-t-2 border-t-gray-400 mt-3 py-2 px-2 md:px-4 flex items-center justify-between">
                                            <span className="font-semibold text-xl">SubTotal</span>
                                            <span className="font-bold text-xl">{currencyFormat(subTotalg)}</span>
                                        </div>
                                    </div>
                                    <div className="py-4 rounded-md shadow-lg">
                                        <h3 className="text-center font-bold text-xl">Saldo de cierre</h3>
                                        <div className="px-2 md:px-4 flex justify-between mt-2">
                                            <span className="font-semibold text-xl">Saldo de apertura</span>
                                            <span className="font-bold text-xl">{currencyFormat(cashRegis.openingBalance)}</span>
                                        </div>
                                        <div className="px-2 md:px-4 flex justify-between">
                                            <span className="font-semibold text-xl">SubTotal</span>
                                            <span className="font-bold text-xl">{currencyFormat(subTotalg)}</span>
                                        </div>
                                        <div className="px-2 md:px-4  flex justify-between">
                                            <span className="font-semibold text-xl">Gastos</span>
                                            <span className="font-bold text-xl">{currencyFormat(cashRegis.totalExpenses)}</span>
                                        </div>
                                        <div className="border-t-2 border-t-gray-400 mt-3 py-2 px-2 md:px-4 flex items-center justify-between">
                                            <span className="font-semibold text-xl">Saldo de cierre</span>
                                            <span className="font-bold text-xl">{currencyFormat(cashRegis.closingBalance)}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col items-center justify-center">
                                <div className=" mb-2 w-full lg:w-4/5">
                                    <div className="px-5 mt-5">
                                        <div className=" py-4 bg-white rounded-md shadow-lg">
                                            <h3 className="text-center font-bold text-xl mb-2">Gastos del día</h3>
                                            {
                                                gastosg.map(data => (
                                                    <div key={data.id} className="px-4 mb-2 ">
                                                        <span className="focus:outline-none text-lg font-medium leading-5 text-gray-800  mt-2">
                                                            {capitalize(data.description)} - {currencyFormat(data.amount)}
                                                        </span>
                                                        <div className="border-b mb-2 mt-2  border-gray-400 border-dashed"></div>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className='px-4 md:px-0 w-full flex flex-col items-center'>
                            <div className=' w-full md:w-3/6'>
                                <h3 className="mt-3">No encontramos ninguna caja, intente con otra fecha</h3>
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
        </div>
    )
}
