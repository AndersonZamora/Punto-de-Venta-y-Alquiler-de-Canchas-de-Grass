'use server';

import prisma from '@/lib/prisma';
import bcryptjs from 'bcryptjs';

export const createUser = async () => {

    try {

        await prisma.user.deleteMany();

        await prisma.user.create({
            data: {
                username: 'jimena',
                name: 'Jimena',
                status: true,
                password: bcryptjs.hashSync('#Jimea03#'),
                role: 'admin'
            }
        })

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