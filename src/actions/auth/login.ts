'use server';

import { AuthError } from 'next-auth';
import { signIn } from '@/auth.config';

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    try {

        await signIn('credentials', {
            ...Object.fromEntries(formData),
            redirect: false,
        });

        return 'Success';

    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Invalid credentials.';
                default:
                    return 'Something went wrong.';
            }
        }

        return "UnknownError"
    }
}

export const login = async (email: string, password: string) => {

    try {

        await signIn('credentials', { email, password });

        return { ok: true }

    } catch (error) {
        return {
            ok: false,
            message:'No se pudo iniciar sesión'
        }
    }
}