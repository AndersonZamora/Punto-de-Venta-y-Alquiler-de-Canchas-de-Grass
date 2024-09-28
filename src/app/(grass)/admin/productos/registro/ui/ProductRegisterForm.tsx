'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { createProduct } from '@/actions';
import { IProduct } from '@/interfaces';
import { errorAlert, loadingAlert, successAlert } from '@/utils';

const marginu = 1.10;

export const ProductRegisterForm = () => {

  const router = useRouter();

  const { handleSubmit, register, watch, setValue, getValues, formState: { errors } } = useForm<IProduct>({
    defaultValues: {
      description: '',
      purchasePrice: 0,
      profitMargin: parseFloat(marginu.toFixed(2)),
      salePrice: 0,
      profit: 0
    }
  });

  const onSutmit = async (data: IProduct) => {

    loadingAlert('Registrando compra...');

    const { status, messsage } = await createProduct({ ...data });

    if (!status) {
      errorAlert(messsage);
      return;
    }

    successAlert('Compra registrada');
    router.replace('/admin/productos');
  }

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (name === 'profitMargin' || name === 'purchasePrice') {
        const price = getValues('purchasePrice');
        const frank = getValues('profitMargin');
        let purchase = price * frank;
        setValue('salePrice', parseFloat(purchase.toFixed(2)), { shouldValidate: false })
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, setValue])

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (name === 'salePrice') {
        const sale = getValues('salePrice');
        const price = getValues('purchasePrice');
        let profit = sale - price;
        setValue('profit', parseFloat(profit.toFixed(2)), { shouldValidate: false })
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, setValue])

  return (
    <form className='fade-in' onSubmit={handleSubmit(onSutmit)} noValidate>
      <div className="grid grid-cols-1 gap-2 sm:gap-5 md:grid-cols-2">
        <div className="flex flex-col mb-2">
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
          <span>Precio de compra</span>
          <input
            type="text"
            className="p-2 border rounded-md bg-gray-200"
            {...register('purchasePrice', {
              required: { value: true, message: 'Precio requerido' },
              pattern: { value: /^\d+(\.\d{1,2})?$/, message: 'Solo números' },
              min: { value: 0.1, message: 'No puede ser cero' },
              minLength: { value: 1, message: 'Ingrese al menos un número' },
              maxLength: { value: 8, message: 'Número no valido' }
            })}
          />
          {errors.purchasePrice && (<span className="text-red-500 font-mono">{errors.purchasePrice?.message}</span>)}
        </div>
        <div className="flex flex-col mb-2">
          <span>Margen Utilidad</span>
          <input
            type="text"
            className="p-2 border rounded-md bg-gray-200"
            {...register('profitMargin', {
              required: { value: true, message: 'El margen de utilidad es requerido' },
              pattern: { value: /^\d+(\.\d{1,6})?$/, message: 'Solo números' },
              min: { value: 0.1, message: 'No puede ser cero' },
              minLength: { value: 1, message: 'Ingrese al menos un número' },
              maxLength: { value: 8, message: 'Número no valido' }
            })}
          />
          {errors.profitMargin && (<span className="text-red-500 font-mono">{errors.profitMargin?.message}</span>)}
        </div>
        <div className="flex flex-col mb-2">
          <span>Precio de venta</span>
          <input
            type="text"
            className="p-2 border rounded-md bg-gray-200"
            {...register('salePrice', {
              required: { value: true, message: 'El precio de venta es requerido' },
              pattern: { value: /^\d+(\.\d{1,2})?$/, message: 'Solo números' },
              min: { value: 0.1, message: 'No puede ser cero' },
              minLength: { value: 1, message: 'Ingrese al menos un número' },
              maxLength: { value: 8, message: 'Número no valido' }
            })}
          />
          {errors.salePrice && (<span className="text-red-500 font-mono">{errors.salePrice?.message}</span>)}
        </div>
        <div className="flex flex-col mb-2">
          <span>Utilidad</span>
          <input
            type="text"
            disabled
            className="p-2 border rounded-md bg-gray-200"
            {...register('profit', {
              required: { value: true, message: 'La utilidad es requerida' },
              pattern: { value: /^\d+(\.\d{1,2})?$/, message: 'Solo números' },
              min: { value: 0.1, message: 'No puede ser cero' },
              minLength: { value: 1, message: 'Ingrese al menos un número' },
              maxLength: { value: 8, message: 'Número no valido' }
            })}
          />
          {errors.profit && (<span className="text-red-500 font-mono">{errors.profit?.message}</span>)}
        </div>
      </div>
      <div className='flex justify-center mt-5 mb-5'>
        <button
          className="w-[200px] md:w-[300px]  text-center  rounded bg-slate-800 py-2.5 text-md font-semibold text-white"
          type="submit"
        >
          Registrar producto
        </button>
      </div>
    </form>
  )
}
