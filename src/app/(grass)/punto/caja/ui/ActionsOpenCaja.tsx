'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import clsx from 'clsx';
import { ModalEfectivo } from './ModalEfectivo';
import Swal from 'sweetalert2';
import { cashClose, openCashAgain } from '@/actions';
import { errorAlert, loadingAlert, successAlert } from '@/utils';

interface Props {
    id: string,
    status: boolean;
}

export const ActionsOpenCaja = ({ id, status }: Props) => {

    const router = useRouter();

    const [openModalEfec, setOpenModalEfec] = useState(false);

    const handleGloseCaja = () => {
        Swal.fire({
            title: "!Atención!",
            icon: "warning",
            text: 'Estas seguro de cerrar caja?',
            confirmButtonColor: "#3085d6",
            confirmButtonText: "Si",
            showCancelButton: true,
            cancelButtonColor: "#d33",
            cancelButtonText: "No"
        }).then(async (result) => {
            if (result.isConfirmed) {

                loadingAlert('Cerrando caja...');

                const { status, message } = await cashClose({ id });
                if (!status) {
                    errorAlert(message);
                    return;
                }

                successAlert('Caja cerrada');
                router.replace('/punto')
            }
        });
    }

    const handleOpenCaja = () => {
        Swal.fire({
            title: "!Atención!",
            icon: "warning",
            text: 'Estas seguro de abrir de nuevo la caja? solo podras cambiar el estado; mas no ingresar dinero',
            confirmButtonColor: "#3085d6",
            confirmButtonText: "Si",
            showCancelButton: true,
            cancelButtonColor: "#d33",
            cancelButtonText: "No"
        }).then(async (result) => {
            if (result.isConfirmed) {

                loadingAlert('Abriendo caja...');

                const { status, message } = await openCashAgain({ id });
                if (!status) {
                    errorAlert(message);
                    return;
                }

                successAlert('Caja abierta');
                router.refresh();
            }
        });
    }

    return (
        <div className="flex items-center justify-center select-none font-mono">
            <div className="flex flex-row items-center gap-4 mt-5">
                <button
                    type='button'
                    onClick={() => setOpenModalEfec(true)}
                    className={
                        clsx(
                            'px-3 text-center py-1 shadow-lg shadow-gray-500/50 bg-amber-500 text-white rounded-lg  cursor-pointer active:scale-[.97]',
                            {
                                'block': status,
                                'hidden': !status
                            }
                        )
                    }>
                    Sacar efectivo
                </button>
                <button
                    onClick={() => handleGloseCaja()}
                    className={
                        clsx(
                            'px-3 py-1  text-center shadow-lg shadow-gray-500/50 bg-red-500 text-white rounded-lg cursor-pointer active:scale-[.97]',
                            {
                                'block': status,
                                'hidden': !status
                            }
                        )
                    }>
                    Cerrar caja
                </button>
                <button
                    onClick={() => handleOpenCaja()}
                    className={
                        clsx(
                            'px-3 py-1  text-center shadow-lg shadow-gray-500/50 bg-green-500 text-white rounded-lg cursor-pointer active:scale-[.97]',
                            {
                                'block': !status,
                                'hidden': status
                            }
                        )
                    }>
                    Abrir caja
                </button>
            </div>
            {
                (openModalEfec) && (<ModalEfectivo openModalPrice={openModalEfec} onCloseModalEfec={() => setOpenModalEfec(false)} />)
            }
        </div >
    )
}
