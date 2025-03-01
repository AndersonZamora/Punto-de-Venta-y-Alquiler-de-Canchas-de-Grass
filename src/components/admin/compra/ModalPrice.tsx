'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import clsx from 'clsx';
import { IoCloseCircleOutline } from 'react-icons/io5';
import { IProduct } from '@/interfaces';
import { useSaleStore } from '@/store';
import { Quantity } from '../ui/Quantity';

interface Props {
  openModalPrice: boolean;
  productView: IProduct;
  onCloseModalPrice: () => void;
}

export const ModalPrice = ({ openModalPrice, productView, onCloseModalPrice }: Props) => {

  const { handleSubmit, register, watch, setValue, getValues, reset, formState: { errors } } = useForm<IProduct>();
  const addProductTocart = useSaleStore(state => state.addProductTocart);
  const [updateQuantity, setUpdateQuantity] = useState(1);
  const [extra, setExtra] = useState(0);

  const onSubmit = (data: IProduct) => {
    addProductTocart({
      id: data.id,
      description: data.description,
      purchasePrice: +data.purchasePrice,
      quantity: updateQuantity,
      profitMargin: +data.profitMargin,
      salePrice: +data.salePrice,
      profit: +data.profit,
      extra: extra,
    });
    setExtra(0);
    onCloseModalPrice();
    setUpdateQuantity(1);
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
    reset(productView);
    setExtra(0);
    setUpdateQuantity(1);
  }, [productView]);

  return (
    <div className={
      clsx(
        'fade-in px-1 md:px-0 fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50 py-10',
        { 'invisible': !openModalPrice }
      )
    }>
      <div className="max-h-full w-full md:max-w-5xl overflow-y-auto sm:rounded-2xl bg-white">
        <div className="w-full">
          <header className="flex items-center justify-between p-2 border-b-2 border-gray-400">
            <h2 className="font-semibold" id="exampleHeader">Precio de compra</h2>
            <button
              onClick={onCloseModalPrice}
              className="transition-colors hover:bg-gray-50 focus:ring focus:outline-none p-2 rounded-full"
            >
              <IoCloseCircleOutline className='w-6 h-6 bg-red-500 rounded' />
            </button>
          </header>
          <div className="p-2 text-center">
            <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete='off'>
              <div className="flex flex-col mb-4">
                <span>Descripción</span>
                <input
                  type="text"
                  autoComplete='off'
                  disabled
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
              <div className="grid grid-cols-1 gap-2 sm:gap-5 md:grid-cols-2">
                <div className="flex flex-col mb-2">
                  <span>Precio de compra</span>
                  <input
                    type="text"
                    autoComplete='off'
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
                    autoComplete='off'
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
                    autoComplete='off'
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
                    autoComplete='off'
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
              <div className="flex flex-row justify-center gap-20 items-center mb-2">
                <div>
                  <span>Cantidad</span>
                  <Quantity
                    quantity={updateQuantity}
                    onQuantityChange={quantity => setUpdateQuantity(quantity)}
                    stock={0}
                  />
                </div>
                <div>
                  <span>Extras</span>
                  <Quantity
                    quantity={extra}
                    onQuantityChange={quantity => setExtra(quantity)}
                    stock={0}
                  />
                </div>
              </div>
              <div className='flex justify-center mt-5 mb-5'>
                <button
                  className="w-[200px] md:w-[300px]  text-center  rounded bg-slate-800 py-2.5 text-md font-semibold text-white"
                  type="submit"
                >
                  Agregar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
