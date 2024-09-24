'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import clsx from 'clsx'
import { IoCloseCircleOutline } from 'react-icons/io5';
import { cashOpen } from '@/actions';
import { errorAlert, loadingAlert, successAlert } from '@/utils';

interface ICash {
  total: number;
}

interface Props {
  openModalPrice: boolean;
  onCloseModal: () => void;
}

export const CashModal = ({ openModalPrice, onCloseModal }: Props) => {

  const router = useRouter();

  const { handleSubmit, register, formState: { errors } } = useForm<ICash>();

  const onSubmit = async (data: ICash) => {

    loadingAlert('Abriendo caja...');
    onCloseModal();

    const { status, message } = await cashOpen(data)
    if (!status) {
      errorAlert(message);
      return;
    }
    
    successAlert('Caja abierta')
    onCloseModal();
    router.refresh()
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
            <h2 className="font-semibold" id="exampleHeader">Abrir caja</h2>
            <button
              onClick={onCloseModal}
              className="transition-colors hover:bg-gray-50 focus:ring focus:outline-none p-2 rounded-full"
            >
              <IoCloseCircleOutline className='w-6 h-6' />
            </button>
          </header>
          <div className="p-2 text-center">
            <form onSubmit={handleSubmit(onSubmit)}>

              <div className="flex flex-col mb-2">
                <span>Saldo de apertura</span>
                <input
                  type="text"
                  autoFocus
                  className="p-2 border rounded-md bg-gray-200"
                  {...register('total', {
                    required: { value: true, message: 'Saldo requerido' },
                    pattern: { value: /^\d+(\.\d{1,2})?$/, message: 'Solo números' },
                    minLength: { value: 1, message: 'Ingrese al menos un número' },
                    maxLength: { value: 8, message: 'Número no valido' }
                  })}
                />
                {errors.total && (<span className="text-red-500 font-mono">{errors.total?.message}</span>)}

              </div>

              <div className='flex justify-center mt-5 mb-5'>
                <button
                  className="w-[200px] md:w-[300px]  text-center  rounded bg-slate-800 py-2.5 text-md font-semibold text-white"
                  type="submit"
                >
                  Abir caja
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
