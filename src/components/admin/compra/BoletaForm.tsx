'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import clsx from 'clsx';
import { useSaleStore } from '@/store';
import { registerComrpaProducts } from '@/actions';
import { ISaleProduct } from '@/interfaces';
import { errorAlert, loadingAlert, successAlert } from '@/utils';

interface InputsBoleta {
    ticketNumber: string;
    dateEntry: string;
}

interface Props {
    sales: ISaleProduct[];
}

export const BoletaForm = ({ sales }: Props) => {

    const { handleSubmit, register, formState: { errors, isValid } } = useForm<InputsBoleta>();
    const clearCart = useSaleStore(state => state.clearCart);
    const router = useRouter();

    const onSutmit = async (data: InputsBoleta) => {

        loadingAlert('Registrando compra...');

        const { status, messsage } = await registerComrpaProducts(
            {
                ...data,
                dateEntry: data.dateEntry,
                sales: sales
            }
        );

        if (!status) {
            errorAlert(messsage);
            return;
        }

        clearCart();
        successAlert('Compra registrada');
        router.replace('/admin/compras');
    }

    return (
        <form onSubmit={handleSubmit(onSutmit)} noValidate>
            <div className="flex flex-col mb-2 ">
                <input
                    type="text"
                    autoFocus
                    placeholder="Nro Doc Fisico"
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    {...register('ticketNumber', {
                        required: { value: true, message: 'El número es requerido' },
                        pattern: { value: /^[a-zA-Z0-9\s.#\-_°]+$/, message: 'No valido' },
                    })}
                />
                {errors.ticketNumber && (<span className="text-red-500 font-mono">{errors.ticketNumber?.message}</span>)}

            </div>

            <div className="flex flex-col mb-2">

                <input
                    type="date"
                    placeholder="Fecha de ingreso"
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    {...register('dateEntry', {
                        required: { value: true, message: 'Fecha requerida' },
                    })}
                />
                {errors.dateEntry && (<span className="text-red-500 font-mono">{errors.dateEntry?.message}</span>)}

            </div>

            <div className="px-5 mt-5">
                <button
                    disabled={!isValid || !(sales.length > 0)}
                    className={
                        clsx(
                            'w-full px-4 py-4 rounded-md shadow-lg text-center font-semibold',
                            {
                                'bg-gray-900 text-white ': !isValid,
                                'bg-yellow-500 text-white': isValid && (sales.length > 0),
                            }
                        )
                    }
                >
                    Registrar compra
                </button>
            </div>
        </form>
    )
}
