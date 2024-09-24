import { capitalize } from './capitalize';
import { es } from 'date-fns/locale';
import { toZonedTime, format } from 'date-fns-tz';
import { add } from 'date-fns/add';
import { getDate, getMonth, getYear } from 'date-fns';

export const getDateServer = (): Date => {
    try {
        const minDate = new Date();
        const options: Intl.DateTimeFormatOptions = { timeZone: 'America/Lima', year: 'numeric', month: '2-digit', day: '2-digit' };
        const formatter = new Intl.DateTimeFormat('es-PE', options);
        const parts = formatter.formatToParts(minDate);
        const year = parts.find(part => part.type === 'year')?.value ?? '2024';
        const month = parts.find(part => part.type === 'month')?.value ?? '07';
        const day = parts.find(part => part.type === 'day')?.value ?? '01';
        const formattedDate = `${year}-${month}-${day}T00:00:00`;
        return new Date(formattedDate);
    } catch (error) {
        return new Date();
    }
}

export const getDated = () => {
    try {

        const options: Intl.DateTimeFormatOptions = {
            timeZone: 'America/Lima',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
        };


        const formatter = new Intl.DateTimeFormat('es-PE', options);
        const parts = formatter.formatToParts(new Date());

        const year = parts.find(part => part.type === 'year')?.value;
        const month = parts.find(part => part.type === 'month')?.value;
        const day = parts.find(part => part.type === 'day')?.value;
        const hour = parts.find(part => part.type === 'hour')?.value;
        const minute = parts.find(part => part.type === 'minute')?.value;
        const second = parts.find(part => part.type === 'second')?.value;

        return {
            fecha: `${year}-${month}-${day}`,
            hora: `${hour}:${minute}:${second}`,
        };
    } catch (error) {
        return {
            fecha: '',
            hora: ''
        }
    }
}

export const formatZonedDate = (date: Date): string => {
    const timeZone = 'America/Lima';
    const zonedDate = toZonedTime(date, timeZone);
    return format(zonedDate, 'EEEE dd MMM yyyy HH:mm:ss', { timeZone: 'America/Lima', locale: es });
};

export const addOneHour = (date: Date, hour: number): Date => {
    return add(date, { hours: hour });
};

export const addOneDay = (date: Date, day: number): Date => {
    return add(date, { days: day });
}

export const currentDate = () => {

    const dayName = format(getDateServer(), 'EEEE', { locale: es });
    const month = format(getDateServer(), 'MMMM', { locale: es });
    const day = format(getDateServer(), 'd', { locale: es });
    const year = format(getDateServer(), 'yyyy', { locale: es });

    return `${capitalize(dayName)} ${day} de ${month} del ${year}`;
}

export const currentDateServer = () => getDateServer();

export const dateServerSale = () => {

    const { fecha, hora } = getDated();

    const [year, month, day] = fecha.split('-').map(Number);
    const [hours, minutes, seconds] = hora.split(':').map(Number);

    const localDate = new Date(year, month - 1, day, hours, minutes, seconds);

    const adjustedDate = new Date(localDate.getTime() - (localDate.getTimezoneOffset() * 60000));

    return adjustedDate.toISOString()
}

export const dateServerPurchase = (dateEntry: string) => {

    const { hora } = getDated();

    const [year, month, day] = dateEntry.split('-').map(Number);
    const [hours, minutes, seconds] = hora.split(':').map(Number);

    const localDate = new Date(year, month - 1, day, hours, minutes, seconds);

    const adjustedDate = new Date(localDate.getTime() - (localDate.getTimezoneOffset() * 60000));

    return adjustedDate.toISOString()
}

export const startDateTime = () => {

    const { fecha } = getDated();

    const [year, month, day] = fecha.split('-').map(Number);

    const localDate = new Date(year, month - 1, day, 8, 0, 0);

    const adjustedDate = new Date(localDate.getTime() - (localDate.getTimezoneOffset() * 60000));

    return adjustedDate.toISOString()
}

export const separateDateTime = (dateEntry: string) => {

    const [fecha, hora] = dateEntry.split("T");

    const [year, month, day] = fecha.split('-').map(Number);
    const [hours, minutes] = hora.split(':').map(Number);

    const localDate = new Date(year, month - 1, day, hours, minutes, 0);

    const adjustedDate = new Date(localDate.getTime() - (localDate.getTimezoneOffset() * 60000));

    return adjustedDate.toISOString()
}

export const separateDateTimeView = (dateEntry: Date) => {

    //* fomarto que debe llegar 20/09/2024, 10:30:00

    const convert = convertDate(dateEntry);

    const [fecha, hora] = convert.split(",");

    return convertTo12HourFormat(hora)
}

const convertTo12HourFormat = (hora: string) => {

    const [hours, minutes] = hora.split(':').map(Number);

    //* Determinamos si es AM o PM
    const period = hours >= 12 ? 'pm' : 'am';

    //* Convertimos las horas al formato de 12 horas (usamos el módulo para que la hora 00 sea 12 AM)
    const hoursIn12 = hours % 12 === 0 ? 12 : hours % 12;

    //* Formateamos el resultado en el formato de 12 horas
    return `${hoursIn12}:${minutes < 10 ? '0' + minutes : minutes} ${period}`;
}

export const convertDate = (fecha: Date) => {

    const options: Intl.DateTimeFormatOptions = {
        timeZone: 'UTC',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
    };

    const formateador = new Intl.DateTimeFormat('es-ES', options);
    const fechaFormateada = formateador.format(fecha);
    return fechaFormateada;
}

export const validateSameDay = (valueStartTime: Date, valueEndTime: Date) => {
    //* Validar si el año es igual
    const sameYear = getYear(valueStartTime) === getYear(valueEndTime);
    //* Validar si el mes es igual
    const sameMonth = getMonth(valueStartTime) === getMonth(valueEndTime);
    //* Validar si el día es igual
    const sameDay = getDate(valueStartTime) === getDate(valueEndTime);

    if (!sameYear || !sameMonth || !sameDay) {
        throw new Error('Ambas fechas deben estar dentro del mismo día, mes y año');
    }
}

export const normalizeDate = (value: Date) => {

    const valueU = convertDate(value);

    const [fecha, hora] = valueU.split(",");
    const [dayv, monthv, yearv,] = fecha.split('/').map(Number);
    const localDate = new Date(yearv, monthv - 1, dayv);

    const dayName = format(localDate, 'EEEE', { locale: es });
    const month = format(localDate, 'MMMM', { locale: es });
    const day = format(localDate, 'd', { locale: es });
    const year = format(localDate, 'yyyy', { locale: es });

    return `${capitalize(dayName)} ${day} de ${month} del ${year} - ${convertTo12HourFormat(hora)}`;
}

export const getStartDateOfWeek = (weekString: string) => {
    const [year, week] = weekString.split('-W').map(Number);

    // Crear un objeto Date para el 1 de enero del año seleccionado
    const firstDayOfYear = new Date(year, 0, 1);

    // Obtener el número de días que se deben sumar para llegar al lunes de la semana seleccionada
    const daysOffset = (week - 1) * 7 + (1 - firstDayOfYear.getDay());

    // Ajustar la fecha para que sea el lunes de esa semana
    const startDateOfWeek = new Date(firstDayOfYear);
    startDateOfWeek.setDate(firstDayOfYear.getDate() + daysOffset);

    return startDateOfWeek
};