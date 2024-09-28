'use server';

import prisma from '@/lib/prisma';

export const getUserById = async (id: string) => {

    try {

        const user = await prisma.user.findFirst({
            where: {
                id: id
            }
        });

        if (!user) return null;

        return { ...user, password: '' }

    } catch (error) {
        throw new Error('Error no existe el usuario')
    }
}