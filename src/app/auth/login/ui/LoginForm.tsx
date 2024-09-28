'use client';

import { useEffect } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import clsx from 'clsx';
import { IoInformationOutline } from 'react-icons/io5';
import { authenticate } from '@/actions';

export const LoginForm = () => {

    const [state, dispath] = useFormState(authenticate, undefined);

    useEffect(() => {
        if (state === 'Success') {
            window.location.replace('/')
        }
    }, [state])

    return (
        <form action={dispath} className="flex flex-col" noValidate>
            <label htmlFor="email">Usuario</label>
            <input
                className="px-5 py-2 border bg-gray-200 rounded mb-5"
                type="text"
                name='email'
            />

            <label htmlFor="email">Contraseña</label>
            <input
                className="px-5 py-2 border bg-gray-200 rounded mb-5"
                type="password"
                name='password'
            />

            <div className='flex h-8 items-end space-x-1'
                aria-live='polite'
                aria-atomic='true'
            >
                {state === 'Invalid credentials.' && (
                    <div className='mb-2 flex flex-grow'>
                        <IoInformationOutline className='h-5 w-5 text-red-500' />
                        <p className='text-sm text-red-500'>Credenciales no son correctas</p>
                    </div>
                )}

            </div>

            <LoginButton />

            <div className="flex items-center my-5">
                <div className="flex-1 border-t border-gray-500"></div>
                <div className="px-2 text-gray-800">O</div>
                <div className="flex-1 border-t border-gray-500"></div>
            </div>
        </form>
    )
}

function LoginButton() {
    const { pending } = useFormStatus();

    return (
        <button
            type='submit'
            className={
                clsx({
                    "btn-primary": !pending,
                    "btn-disabled": pending
                })
            }
            disabled={pending}
        >
            Ingresar
        </button>

    )
}