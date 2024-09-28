'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import clsx from 'clsx';
import { useBodegaStore } from '@/store';
import { IoCloseCircleOutline } from 'react-icons/io5';
import { Quantity } from '@/components/admin/ui/Quantity';
import { IBodegaProduct } from '@/interfaces';

interface Props {
  openModalPrice: boolean;
  productView: IBodegaProduct;
  onCloseModalPrice: () => void;
}

export const BodegaModalPrice = ({ openModalPrice, productView, onCloseModalPrice }: Props) => {

  const { handleSubmit, register, reset, formState: { errors } } = useForm<IBodegaProduct>();
  const addProductTocartB = useBodegaStore(state => state.addProductTocartB);
  const [updateQuantity, setUpdateQuantity] = useState(0);

  const onSubmit = (data: IBodegaProduct) => {
    addProductTocartB({
      id: data.id,
      description: data.description,
      salePrice: data.salePrice,
      quantity: updateQuantity,
      stock: data.stock
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
            <h2 className="font-semibold" id="exampleHeader">Producto</h2>
            <button
              onClick={onCloseModalPrice}
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
                  disabled
                  {...register('description')}
                />
                {errors.description && (<span className="text-red-500 font-mono">{errors.description?.message}</span>)}
              </div>

              <div className="flex flex-col mb-2">
                <span>Precio de venta</span>
                <input
                  type="text"
                  disabled
                  className="p-2 border rounded-md bg-gray-200"
                  {...register('salePrice')}
                />
              </div>

              <div className="flex flex-col items-center mb-2">
                <span>Cantidad</span>
                <Quantity
                  quantity={updateQuantity}
                  onQuantityChange={quantity => setUpdateQuantity(quantity)}
                  stock={productView.stock}
                  values={true}
                />
              </div>
              <div className='flex justify-center mt-5 mb-5'>
                <button
                  disabled={!(productView.stock > 0)}
                  className="w-[200px] md:w-[300px] text-center rounded bg-green-600 py-2.5 text-md font-semibold text-white"
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
