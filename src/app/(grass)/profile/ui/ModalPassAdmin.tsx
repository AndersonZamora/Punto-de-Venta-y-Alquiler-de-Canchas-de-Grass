'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { IoCloseCircleOutline } from 'react-icons/io5';
import { logout, updatePassUser } from '@/actions';
import { errorAlert, loadingAlert, successAlert } from '@/utils';
import clsx from 'clsx';
import { useBodegaStore, useSaleStore, useUserStore } from '@/store';

interface InputPass {
    password: string;
}

interface Props {
    id: string;
    openModalPass: boolean;
    onCloseModalPass: () => void;
}

export const ModalPassAdmin = ({ openModalPass, onCloseModalPass, id }: Props) => {

    const { handleSubmit, register, reset, formState: { errors } } = useForm<InputPass>();

    const clearCart = useSaleStore(state => state.clearCart);
    const clearSale = useBodegaStore(state => state.clearSale);
    const clearUser = useUserStore(state => state.clearUser);

    const onSubmitPass = async (data: InputPass) => {

        loadingAlert('Actualizando contraseña...');

        const { status, message } = await updatePassUser({ ...data, id });

        if (!status) {
            errorAlert(message);
            return;
        }

        onCloseModalPass();
        successAlert('Contraseña actaulizada');

        clearCart();
        clearSale();
        clearUser();

        await logout();
    }

    useEffect(() => {
        reset({ password: '' })
    }, [])

    return (
        <div className={
            clsx(
                'fade-in px-1 md:px-0 fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50 py-10',
                { 'invisible': !openModalPass }
            )
        }>
            <div className="fade-in max-h-full w-full max-w-xl overflow-y-auto sm:rounded-2xl bg-white">
                <div className="w-full">
                    <header className="flex items-center justify-between p-2 border-b-2 border-gray-400">
                        <h2 className="font-semibold" id="exampleHeader">Actualizar contraseña</h2>
                        <button
                            onClick={onCloseModalPass}
                            className="transition-colors hover:bg-gray-50 focus:ring focus:outline-none p-2 rounded-full"
                        >
                            <IoCloseCircleOutline className='w-6 h-6' />
                        </button>
                    </header>
                    <div className="p-2 text-center">
                        <form onSubmit={handleSubmit(onSubmitPass)} noValidate autoComplete='off'>
                            <div className="flex flex-col mb-2">
                                <span>Contraseña</span>
                                <input
                                    type="text"
                                    autoComplete='off'
                                    className="p-2 border rounded-md bg-gray-200"
                                    {...register('password', {
                                        required: { value: true, message: 'Contraseña requerida' },
                                        pattern: { value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>]).{6,}$/, message: 'La contraseña debe tenere al menos, una letra mayúscula, una letra minúscula, un número, un carácter especial' },
                                        minLength: { value: 8, message: 'Longitud mínima de 8 caracteres' },
                                        maxLength: { value: 10, message: 'Longitud maxima de 10 caracteres' }
                                    })}
                                />
                                {errors.password && (<span className="text-red-500 font-mono">{errors.password?.message}</span>)}
                            </div>
                            <div className='flex justify-center mt-5 mb-5'>
                                <button
                                    className="w-[200px] md:w-[300px]  text-center  rounded bg-blue-600 py-2.5 text-md font-semibold text-white"
                                    type="submit"
                                >
                                    Actualizar contraseña
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
