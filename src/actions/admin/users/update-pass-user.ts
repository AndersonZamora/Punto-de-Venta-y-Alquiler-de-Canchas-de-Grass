'use server';

import { revalidatePath } from 'next/cache';
import prisma from '@/lib/prisma';
import bcryptjs from 'bcryptjs';
import { auth } from '@/auth.config';

interface InputPass {
    password: string;
    id: string;
}

export const updatePassUser = async (data: InputPass) => {

    try {

        const { id, password } = data;

        const session = await auth();

        if (session?.user.role !== 'admin') {
            return {
                status: false,
                message: 'privilegios insuficientes',
            }
        }

        const userDb = await prisma.user.findFirst({
            where: {
                id: id
            }
        });

        if (!userDb) {
            return {
                status: false,
                message: 'No pudimos encontrar el usuario',
            }
        }

        await prisma.user.updateMany({
            data: {
                password: bcryptjs.hashSync(password.trim()),
            },
            where: {
                id: id
            }
        })

        revalidatePath('/admin/usuarios');

        return {
            status: true,
            message: 'ok',
        };

    } catch (error) {
        return {
            status: false,
            message: 'Error no controlado - contacte al administrador',
        };
    }
}