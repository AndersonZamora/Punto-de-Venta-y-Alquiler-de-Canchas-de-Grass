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

  const { handleSubmit, register, reset, formState: { errors } } = useForm<IProduct>();
  const addProductTocart = useSaleStore(state => state.addProductTocart);
  const [updateQuantity, setUpdateQuantity] = useState(1);

  const onSubmit = (data: IProduct) => {
    addProductTocart({
      id: data.id,
      description: data.description,
      purchasePrice: +data.purchasePrice,
      quantity: updateQuantity,
      profitMargin: +data.profitMargin,
      salePrice: +data.salePrice,
      profit: +data.profit
    });
    onCloseModalPrice();
    setUpdateQuantity(1);
  }

  useEffect(() => {
    reset(productView);
    setUpdateQuantity(1);
  }, [productView]);

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
            <h2 className="font-semibold" id="exampleHeader">Precio de compra</h2>
            <button
              onClick={onCloseModalPrice}
              className="transition-colors hover:bg-gray-50 focus:ring focus:outline-none p-2 rounded-full"
            >
              <IoCloseCircleOutline className='w-6 h-6' />
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
                    pattern: { value: /^[a-zA-Z0-9\s.#\-_°]+$/, message: 'No valido' },
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
                  autoComplete='off'
                  disabled
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
              <div className="flex flex-col items-center mb-2">
                <span>Cantidad - Unidades</span>
                <Quantity
                  quantity={updateQuantity}
                  onQuantityChange={quantity => setUpdateQuantity(quantity)}
                  stock={0}
                />
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
