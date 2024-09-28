'use server';

import prisma from '@/lib/prisma';
import bcryptjs from 'bcryptjs';

export const credentialLogin = async (username: string, pass:string) => {

    try {

        const user = await prisma.user.findUnique({ where: { username: username.toLowerCase().trim() } });

        if (!user) return null;

        if (!user.status) return null;

        if (!bcryptjs.compareSync(pass, user.password)) return null;

        const { password, ...rest } = user;

        return rest;

    } catch (error) {
        return null
    }
}
