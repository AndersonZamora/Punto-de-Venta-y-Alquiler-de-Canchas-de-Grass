'use server';

import prisma from '@/lib/prisma';
import bcryptjs from 'bcryptjs';

export const createUser = async () => {

    try {

        await prisma.user.deleteMany();

        await prisma.user.create({
            data: {
                username: 'admin01',
                name: 'admin',
                status: true,
                password: bcryptjs.hashSync('123456'),
                role: 'admin'
            }
        })

        await prisma.user.create({
            data: {
                username: 'user01',
                name: 'user',
                status: true,
                password: bcryptjs.hashSync('123456'),
                role: 'user'
            }
        })

        return {
            status: true,
            message: 'ok',
        }

    } catch (error) {
        console.log(error)
        return {
            status: false,
            message: 'Error no controlado - contacte al administrador',
        }

    }
}