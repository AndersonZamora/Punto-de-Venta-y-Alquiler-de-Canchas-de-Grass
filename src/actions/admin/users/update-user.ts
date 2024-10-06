'use server';

import { revalidatePath } from 'next/cache';
import { IUser } from '@/interfaces';
import prisma from '@/lib/prisma'
import { auth } from '@/auth.config';

export const updateUser = async (user: IUser) => {

    try {

        const { id, name, role, status } = user;

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
                name: name.toLocaleLowerCase().trim(),
                status: status,
                role: role
            },
            where: {
                id: id
            }
        })

        revalidatePath(`/admin/usuarios/${id}`);
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