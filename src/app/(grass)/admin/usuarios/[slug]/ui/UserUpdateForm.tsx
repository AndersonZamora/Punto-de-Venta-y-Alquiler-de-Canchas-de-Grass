'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { updateUser } from '@/actions';
import { IUser } from '@/interfaces';
import { errorAlert, loadingAlert, successAlert } from '@/utils';
import clsx from 'clsx';

interface Props {
  user: IUser
}

export const UserUpdateForm = ({ user }: Props) => {

  const { handleSubmit, register, formState: { errors } } = useForm<IUser>({
    defaultValues: { ...user }
  });

  const router = useRouter();

  const onSutmit = async (data: IUser) => {

    loadingAlert('Actualizando usuario...');

    const { status, message } = await updateUser(data)

    if (!status) {
      errorAlert(message);
      return;
    }

    successAlert('Usuario actaulizado');
    router.replace('/admin/usuarios');
  }

  return (
    <form onSubmit={handleSubmit(onSutmit)} noValidate>
      <div className="grid grid-cols-1 gap-2 sm:gap-5 sm:grid-cols-2">
        <div className="flex flex-col mb-2">
          <span>Nombre completo</span>
          <input
            type="text"
            autoFocus
            className="p-2 border rounded-md bg-gray-200"
            {...register('name', {
              required: { value: true, message: 'Nombre requerido' },
              pattern: { value: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, message: 'No valido' },
              minLength: { value: 3, message: 'Minimo 3 letras' },
              maxLength: { value: 50, message: 'Maximo 100 letras' }
            })}
          />
          {errors.name && (<span className="text-red-500 font-mono">{errors.name?.message}</span>)}
        </div>
        <div className="flex flex-col mb-2">
          <span>Usuario</span>
          <input
            type="text"
            autoFocus
            disabled
            className="p-2 border rounded-md bg-gray-200"
            {...register('username')}
          />
        </div>

        <div className="flex flex-col mb-2">
          <span>Rol</span>
          <select
            className="p-2 border rounded-md bg-gray-200"
            {...register('role', {
              required: { value: true, message: 'Seleccione un rol' },
            })}
          >
            <option value="">[ Seleccione ]</option>
            <option value={'user'}>Empleado</option>
            <option value={'admin'}>Admin</option>

          </select>
          {errors.role && (<span className="text-red-500 font-mono">{errors.role?.message}</span>)}
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
              {...register('status')}
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
                'bg-red-400 rounded-sm p-1 text-white ': !user.status,
                'bg-green-600 rounded-sm p-1 text-white ': user.status,
              }
            )
          } >
            Estado del usuario: {user.status ? 'Activo' : 'Inactivo'}
          </span>
        </div>
      </div>

      <div className='flex justify-center mt-5 mb-5'>
        <button
          className="w-[200px] md:w-[300px]  text-center  rounded bg-green-600 py-2.5 text-md font-semibold text-white"
          type="submit"
        >
          Actualizar
        </button>
      </div>
    </form>
  )
}
