'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { IProduct } from '@/interfaces';
import { errorAlert } from '@/utils';
import clsx from 'clsx';
import { updateProduct } from '@/actions/admin/product/update-product';
import { LoadingPage } from '@/components';

interface Props {
  product: IProduct
}

export const ProductUpdateForm = ({ product }: Props) => {

  const { handleSubmit, register, watch, setValue, getValues, formState: { errors } } = useForm<IProduct>({
    defaultValues: { ...product }
  });

  const [loading, setLoading] = useState(true);

  const onSutmit = async (data: IProduct) => {
    const { status, messsage } = await updateProduct({ ...data });
    setLoading(true);
    if (!status) {
      setLoading(false);
      errorAlert(messsage);
      return;
    }

    window.location.replace('/admin/productos');
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

  useEffect(() => {
    setLoading(false);
  }, [])

  return (
    <>
      {
        (loading) ? (<LoadingPage />) :
          (
            <form onSubmit={handleSubmit(onSutmit)}>
           
              <div className="fadeIn grid grid-cols-1 gap-2 sm:gap-5 sm:grid-cols-2">
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
                <div className="flex flex-row items-center mb-2 mt-0 md:mt-5">
                  <label
                    className="relative  flex cursor-pointer items-center rounded-full p-3"
                    htmlFor="checkbox"
                  >
                    <input
                      type="checkbox"
                      className="border-gray-500 before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-blue-500 checked:bg-blue-500 checked:before:bg-blue-500 hover:before:opacity-10"
                      id="checkbox"
                      // checked
                      {...register('state')}
                    />
                    <div className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3.5 w-3.5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        stroke="currentColor"
                        strokeWidth="1"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </div>
                  </label>
                  <span className={
                    clsx(
                      'text-lg',
                      {
                        'bg-red-400 rounded-sm p-1 text-white ': !product.state,
                        'bg-green-600 rounded-sm p-1 text-white ': product.state,
                      }
                    )
                  } >
                    Estado del producto: {product.state ? 'Activo' : 'Inactivo'}
                  </span>
                </div>
              </div>

              <div className='flex justify-center mt-5 mb-5'>
                <button
                  className="w-[200px] md:w-[300px]  text-center  rounded bg-slate-800 py-2.5 text-md font-semibold text-white"
                  type="submit"
                >
                  Actualizar
                </button>
              </div>
            </form>
          )
      }
    </>
  )
}
