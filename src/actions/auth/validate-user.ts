'use server';

import prisma from '@/lib/prisma';

export const validateUser = async (username: string) => {

    try {

        const user = await prisma.user.findUnique({ where: { username: username.toLowerCase().trim() } });

        if (!user) return null;

        if (!user.status) return null;

        const { password, ...rest } = user;

        return rest;

    } catch (error) {
        return null
    }
}
