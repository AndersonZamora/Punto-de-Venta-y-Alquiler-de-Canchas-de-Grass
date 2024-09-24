'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { createUser } from '@/actions';
import { IUser } from '@/interfaces';
import { errorAlert, loadingAlert, successAlert } from '@/utils';

export const UserRegisterForm = () => {

  const { handleSubmit, register, formState: { errors } } = useForm<IUser>();

  const router = useRouter();

  const onSutmit = async (data: IUser) => {

    loadingAlert('Registrando usuario...');

    const { status, message } = await createUser(data)

    if (!status) {
      errorAlert(message);
      return;
    }

    successAlert('Usuario registrado');

    router.replace('/admin/usuarios');
  }

  return (
    <form onSubmit={handleSubmit(onSutmit)}>
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
            className="p-2 border rounded-md bg-gray-200"
            {...register('username', {
              required: { value: true, message: 'Usuario requerido' },
              pattern: { value: /^[a-zA-Z]+$/, message: 'No valido' },
              minLength: { value: 3, message: 'Minimo 3 letras' },
              maxLength: { value: 8, message: 'Maximo 8 letras' }
            })}
          />
          {errors.username && (<span className="text-red-500 font-mono">{errors.username?.message}</span>)}
        </div>
        <div className="flex flex-col mb-2">
          <span>Contraseña</span>
          <input
            type="text"
            autoFocus
            className="p-2 border rounded-md bg-gray-200"
            {...register('password', {
              required: { value: true, message: 'Contraseña requerida' },
              pattern: { value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>]).{6,}$/, message: 'La contraseña debe tenere al menos, una letra mayúscula, una letra minúscula, un número, un carácter especial' },
              minLength: { value: 8, message: 'Longitud mínima de 8 caracteres' },
              maxLength: { value: 10, message: 'Longitud maxima de 10 caracteres' }
            })}
          />
          {errors.password && (<span className="text-red-500 font-mono">{errors.password?.message}</span>)}
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
      </div>

      <div className='flex justify-center mt-5 mb-5'>
        <button
          className="w-[200px] md:w-[300px]  text-center  rounded bg-slate-800 py-2.5 text-md font-semibold text-white"
          type="submit"
        >
          Registrar
        </button>
      </div>
    </form>
  )
}
