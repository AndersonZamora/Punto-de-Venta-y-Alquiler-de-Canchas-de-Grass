'use server';

import { revalidatePath } from 'next/cache';
import prisma from '@/lib/prisma';
import { IUser } from '@/interfaces';
import bcryptjs from 'bcryptjs';
import { auth } from '@/auth.config';

export const createUser = async (user: IUser) => {

    try {

        const { name, username, password, role } = user;

        const session = await auth();

        if (session?.user.role !== 'admin') {
            return {
                status: false,
                message: 'privilegios insuficientes',
            }
        }

        const exist = await prisma.user.findUnique({
            where: { username: username.toLocaleLowerCase().trim() }
        })

        if (exist) {
            return {
                status: false,
                message: 'Nombre de usuario ya registrado',
            }
        }

        await prisma.user.create({
            data: {
                name: name.toLocaleLowerCase().trim(),
                username: username.toLocaleLowerCase().trim(),
                password: bcryptjs.hashSync(password.trim()),
                status: false,
                role: role
            }
        })

        revalidatePath('/admin/usuarios');

        return {
            status: true,
            message: 'ok',
        }

    } catch (error) {
        return {
            status: false,
            message: 'Error no controlado - contacte al administrador',
        }
    }
}