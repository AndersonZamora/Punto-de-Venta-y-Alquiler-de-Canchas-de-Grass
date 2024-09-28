'use client'

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import clsx from 'clsx';
import { IoCloseCircleOutline } from 'react-icons/io5';
import { cashWithdrawMoney } from '@/actions';
import { errorAlert, loadingAlert, successAlert } from '@/utils';

interface IEfectivo {
    description: string;
    amount: number;
}

interface Props {
    openModalPrice: boolean;
    onCloseModalEfec: () => void;
}

export const ModalEfectivo = ({ openModalPrice, onCloseModalEfec }: Props) => {

    const router = useRouter();

    const { handleSubmit, register, formState: { errors } } = useForm<IEfectivo>();

    const onSubmit = async (data: IEfectivo) => {

        loadingAlert('Registrando gasto...');

        const { status, message } = await cashWithdrawMoney(data);

        if (!status) {
            errorAlert(message);
            return;
        }

        onCloseModalEfec();
        successAlert('Gasto registrado correctamente');
        router.refresh();
    }

    return (
        <div className={
            clsx(
                'fade-in px-1 md:px-0 fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50 py-10',
                { 'invisible': !openModalPrice }
            )
        }>

            <div className="max-h-full w-full max-w-xl overflow-y-auto sm:rounded-2xl bg-white">
                <div className="w-full">
                    <header className="flex items-center justify-between p-2 border-b-2 border-gray-400">
                        <h2 className="font-semibold" id="exampleHeader">Sacar efectivo</h2>
                        <button
                            onClick={onCloseModalEfec}
                            className="transition-colors hover:bg-gray-50 focus:ring focus:outline-none p-2 rounded-full"
                        >
                            <IoCloseCircleOutline className='w-6 h-6' />
                        </button>
                    </header>
                    <div className="p-2 text-center">
                        <form onSubmit={handleSubmit(onSubmit)} noValidate>
                            <div className="flex flex-col mb-4">
                                <span>Descripción</span>
                                <input
                                    type="text"
                                    autoFocus
                                    className="p-2 border rounded-md bg-gray-200"
                                    {...register('description', {
                                        required: { value: true, message: 'La descripción es requerida' },
                                        pattern: { value: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9\s.#\-_°]+$/, message: 'No valido' },
                                        minLength: { value: 3, message: 'Minimo 3 letras' },
                                        maxLength: { value: 100, message: 'Maximo 100 letras' }
                                    })}
                                />
                                {errors.description && (<span className="text-red-500 font-mono">{errors.description?.message}</span>)}

                            </div>
                            <div className="flex flex-col mb-2">
                                <span>Monto</span>
                                <input
                                    type="text"
                                    className="p-2 border rounded-md bg-gray-200"
                                    {...register('amount', {
                                        required: { value: true, message: 'Precio requerido' },
                                        pattern: { value: /^\d+(\.\d{1,2})?$/, message: 'Solo números' },
                                        min: { value: 0, message: 'No puede ser cero' },
                                        minLength: { value: 1, message: 'Ingrese al menos un número' },
                                        maxLength: { value: 8, message: 'Número no valido' }
                                    })}
                                />
                                {errors.amount && (<span className="text-red-500 font-mono">{errors.amount?.message}</span>)}

                            </div>

                            <div className='flex justify-center mt-5 mb-5'>
                                <button
                                    className="w-[200px] md:w-[300px]  text-center  rounded bg-red-600 py-2.5 text-md font-semibold text-white"
                                    type="submit"
                                >
                                    Retirar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
