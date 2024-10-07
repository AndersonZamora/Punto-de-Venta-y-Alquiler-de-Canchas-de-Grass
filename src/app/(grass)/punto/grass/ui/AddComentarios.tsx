'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import clsx from 'clsx';
import { updateRentalPunto } from '@/actions';
import { IoCloseCircleOutline } from 'react-icons/io5';
import { errorAlert, loadingAlert, successAlert } from '@/utils';

interface IComet {
    id: string;
    description: string;
}

interface Props {
    data: IComet,
    openDetail: boolean;
    handleClose: () => void;
}

export const AddComentarios = ({ data, openDetail, handleClose }: Props) => {

    const router = useRouter();

    const { handleSubmit, register, reset, formState: { errors } } = useForm<IComet>({
        defaultValues: { ...data }
    });


    const onSubmitD = async (info: IComet) => {

        loadingAlert('Actualizando reserva');

        const { status, message } = await updateRentalPunto({ ...info });

        if (!status) {
            errorAlert(message);
            return;
        }

        handleClose()
        successAlert('Reserva actualizada');
        router.refresh();
    }

    useEffect(() => {
        reset({ ...data })
    }, [data])

    return (
        <>

            <div className={
                clsx(
                    'fade-in px-1 md:px-0 fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50 py-10',
                    { 'invisible': !openDetail }
                )
            }>
                <div className="max-h-full w-full max-w-2xl overflow-y-auto sm:rounded-2xl bg-white">
                    <div className="w-full">
                        <header className="flex items-center justify-between p-2 border-b-2 border-gray-400">
                            <h2 className="font-semibold" id="exampleHeader">Comentarios</h2>
                            <button
                                onClick={() => handleClose()}
                                className="transition-colors hover:bg-gray-50 focus:ring focus:outline-none p-2 rounded-full"
                            >
                                <IoCloseCircleOutline className='w-6 h-6' />
                            </button>
                        </header>
                        <div className="p-2 text-center">
                            <form onSubmit={handleSubmit(onSubmitD)} noValidate autoComplete='off'>
                                <div className="flex flex-col mb-2 mt-2">
                                    <span>Comentarios</span>
                                    <input
                                        type="text"
                                        autoComplete='off'
                                        className="p-2 border rounded-md bg-gray-200 h-20"
                                        {...register('description', {
                                            required: { value: true, message: 'Ingrese detalle' },
                                            pattern: { value: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9\s.#\-_:°]+$/, message: 'No valido' },
                                            maxLength: { value: 100, message: 'Maximo 100 letras' }
                                        })}
                                    />
                                    {errors.description && (<span className="text-red-500 font-mono">{errors.description?.message}</span>)}
                                </div>

                                <div className='flex justify-center mt-5 mb-5'>
                                    <button
                                        className="w-[200px] md:w-[300px]  text-center  rounded bg-slate-800 py-2.5 text-md font-semibold text-white"
                                        type="submit"
                                    >
                                        Actualizar comentario
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
