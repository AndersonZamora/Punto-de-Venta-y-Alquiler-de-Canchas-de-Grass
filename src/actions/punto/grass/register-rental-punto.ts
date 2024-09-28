'use server';

import { revalidatePath } from 'next/cache';
import prisma from '@/lib/prisma';
import { isBefore, isAfter, differenceInMinutes } from 'date-fns';
import { IRental } from '@/interfaces';
import { currentDateServer, startDateTime, separateDateTime, validateSameDay } from '@/utils';

interface Props {
  rental: IRental;
}

export const registerRentalPunto = async ({ rental }: Props) => {

  try {

    const startOfDay = currentDateServer();
    startOfDay.setHours(0, 0, 0, 0);

    const cashRegister = await prisma.cashRegister.findFirst({
      where: {
        openTime: {
          gte: startOfDay
        },
        status: true
      },
    });

    if (!cashRegister) {
      return {
        status: false,
        message: 'No hay una caja abierta actualmente'
      }
    }

    const earliestStartTime = startDateTime();
    const startTime = separateDateTime(`${rental.startTime}`);
    const endTime = separateDateTime(`${rental.endTime}`);

    validateSameDay(new Date(rental.startTime), new Date(rental.endTime));

    if (isBefore(startTime, earliestStartTime)) {
      throw new Error('El tiempo de ingreso debe ser después de las 8:00 AM');
    }

    if (isAfter(startTime, endTime)) {
      throw new Error('El tiempo de ingreso debe ser antes del tiempo de salida');
    }

    const interval = differenceInMinutes(endTime, startTime);

    if (interval < 15) {
      throw new Error('Debe haber un intervalo mínimo de 15 minutos entre el tiempo de ingreso y el tiempo de salida');
    }

    //* Verificar si hay conflictos en la base de datos
    const overlappingRentals = await prisma.rental.findMany({
      where: {
        OR: [
          //* Caso 1: Reservas que empiezan antes de la nueva reserva pero terminan durante o después
          {
            startTime: {
              lte: startTime,
            },
            endTime: {
              gte: startTime,
            },
          },
          //* Caso 2: Reservas que empiezan durante el nuevo rango
          {
            startTime: {
              lte: endTime,
              gte: startTime,
            },
          },
        ],
      },
    });

    if (overlappingRentals.length > 0) {
      throw new Error('El rango de tiempo ya está ocupado por otra reserva');
    }

    const descrip = rental.description || '-';

    await prisma.rental.createMany({
      data: {
        customerName: rental.customerName.toLocaleLowerCase().trim(),
        documentDni: rental.documentDni,
        phone: rental.phone,
        startTime: startTime,
        endTime: endTime,
        total: +rental.total,
        description: descrip.toLocaleLowerCase().trim(),
        registeredBy: 'user 1',
        cashRegisterId: cashRegister.id
      }
    })

    await prisma.cashRegister.update({
      where: { id: cashRegister.id },
      data: {
        totalRentals: {
          increment: +rental.total, //* Asumiendo que `sale.total` es el total de la venta
        },
        closingBalance: {
          increment: +rental.total
        }
      },
    });

    revalidatePath('/punto/grass');
    revalidatePath('/admin/ventas');

    return {
      status: true,
      message: 'ok',
    }

  } catch (error) {
    if (error instanceof Error) {
      return {
        status: false,
        message: error.message,
      }
    }
    return {
      status: false,
      message: 'Error no controlado - contacte al administrador',
    }
  }
}
