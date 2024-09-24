'use server';

import { auth } from '@/auth.config';
import prisma from '@/lib/prisma';

export const getUsers = async () => {

    try {

        const users = await prisma.user.findMany();

        const session = await auth();

        const fillUsers = users.filter(p => p.id !== session?.user.id);

        return {
            status: true,
            messsage: 'ok',
            users: fillUsers.map(data => ({
                ...data,
                password: '',
            }))
        }

    } catch (error) {
        console.log(error)
        return {
            status: false,
            product: null,
            messsage: 'Error no controlado - contacte al administrador',
            users: [],
        }
    }
}
