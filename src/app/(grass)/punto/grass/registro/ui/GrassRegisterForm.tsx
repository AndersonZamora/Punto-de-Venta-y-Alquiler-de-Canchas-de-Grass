'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { registerRentalPunto } from '@/actions';
import { IRental } from '@/interfaces';
import { dateServerSale, errorAlert, loadingAlert, successAlert } from '@/utils';

export const GrassRegisterForm = () => {

    const router = useRouter();

    const { handleSubmit, register, formState: { errors } } = useForm<IRental>({
        defaultValues: {
            id: '',
            customerName: '',
            documentDni: '',
            description: '-',
            total: 0,
            registeredBy: '',
        }
    });

    const onSutmit = async (data: IRental) => {

        loadingAlert('Registrando reserva...');

        const { status, message } = await registerRentalPunto({ rental: data });

        if (!status) {
            errorAlert(message);
            return;
        }

        successAlert('Reserva registrada');
        router.replace('/punto/grass');
    }

    return (
        <form className='fade-in' onSubmit={handleSubmit(onSutmit)}>
            <div className="grid grid-cols-1 gap-2 sm:gap-5 sm:grid-cols-2">
                <div className="flex flex-col mb-2">
                    <span>Nombre</span>
                    <input
                        type="text"
                        autoFocus
                        className="p-2 border rounded-md bg-gray-200"
                        {...register('customerName', {
                            required: { value: true, message: 'El nombre es requerido' },
                            pattern: { value: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, message: 'No valido' },
                            minLength: { value: 3, message: 'Minimo 3 letras' },
                            maxLength: { value: 50, message: 'Maximo 50 letras' }
                        })}
                    />
                    {errors.customerName && (<span className="text-red-500 font-mono">{errors.customerName?.message}</span>)}

                </div>
                <div className="flex flex-col mb-2">
                    <span>DNI</span>
                    <input
                        type="text"
                        className="p-2 border rounded-md bg-gray-200"
                        {...register('documentDni', {
                            required: { value: true, message: 'DNI requerido' },
                            pattern: { value: /^[0-9]+$/, message: 'Solo números' },
                            minLength: { value: 8, message: 'DNI no valido' },
                            maxLength: { value: 8, message: 'DNI no valido' }
                        })}
                    />
                    {errors.documentDni && (<span className="text-red-500 font-mono">{errors.documentDni?.message}</span>)}

                </div>

                <div className="flex flex-col mb-2">
                    <span>Celular</span>
                    <input
                        type="text"
                        className="p-2 border rounded-md bg-gray-200"
                        {...register('phone', {
                            required: { value: true, message: 'Celular requerido' },
                            pattern: { value: /^[0-9]+$/, message: 'Solo números' },
                            minLength: { value: 9, message: 'Celular no valido' },
                            maxLength: { value: 9, message: 'Celular no valido' }
                        })}
                    />
                    {errors.phone && (<span className="text-red-500 font-mono">{errors.phone?.message}</span>)}

                </div>

                <div className="flex flex-col mb-2">
                    <span>Total</span>
                    <input
                        type="text"
                        className="p-2 border rounded-md bg-gray-200"
                        {...register('total', {
                            required: { value: true, message: 'Precio requerido' },
                            pattern: { value: /^\d+(\.\d{1,2})?$/, message: 'Solo números' },
                            min: { value: 1, message: 'No puede ser cero' },
                            minLength: { value: 1, message: 'Ingrese al menos un número' },
                            maxLength: { value: 5, message: 'Número no valido' }
                        })}
                    />
                    {errors.total && (<span className="text-red-500 font-mono">{errors.total?.message}</span>)}

                </div>

                <div className="flex flex-col mb-2">
                    <span>Ingreso</span>
                    <input
                        min={dateServerSale().slice(0, 16)} //* Bloquea los días anteriores
                        max={dateServerSale().slice(0, 10) + 'T23:59'} //* Bloquea los días posteriores
                        type="datetime-local"
                        className="p-2 border rounded-md bg-gray-200"
                        {...register('startTime', {
                            required: { value: true, message: 'El ingreso es requerido' }
                        })}
                    />
                    {errors.startTime && (<span className="text-red-500 font-mono">{errors.startTime?.message}</span>)}
                </div>

                <div className="flex flex-col mb-2">
                    <span>Salida</span>
                    <input
                        min={dateServerSale().slice(0, 16)} //* Bloquea los días anteriores
                        max={dateServerSale().slice(0, 10) + 'T23:59'} //* Bloquea los días posteriores
                        type="datetime-local"
                        className="p-2 border rounded-md bg-gray-200"
                        {...register('endTime', {
                            required: { value: true, message: 'La salida es requerida' }
                        })}
                    />
                    {errors.endTime && (<span className="text-red-500 font-mono">{errors.endTime?.message}</span>)}

                </div>
            </div>
            <div className="flex flex-col mb-2 mt-2">
                <span>Comentarios</span>
                <input
                    type="text"
                    className="p-2 border rounded-md bg-gray-200 h-16"
                    {...register('description', {
                        required: { value: true, message: 'Ingrese detalle' },
                        pattern: { value: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9\s.#\-_°]+$/, message: 'No valido' },
                        maxLength: { value: 100, message: 'Maximo 100 letras' }
                    })}
                />
                {errors.description && (<span className="text-red-500 font-mono">{errors.description?.message}</span>)}
            </div>
            <div className='flex justify-center mt-5 mb-5'>
                <button
                    className="w-[200px] md:w-[300px]  text-center  rounded bg-green-600 py-2.5 text-md font-semibold text-white"
                    type="submit"
                >
                    Registrar
                </button>
            </div>
        </form>
    )
}
