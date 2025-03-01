import { normalizeDateRe } from './dateFormat';

interface ReportData {
    openTime: Date;
    openingBalance: number;
    closingBalance: number;
}

interface ReportDataUtili {
    total: number;
    startTime: Date;
    endTime: Date;
}

interface BarChartData {
    labels: string[];
    datasets: {
        label: string;
        data: number[];
        backgroundColor: string[];
    }[];
}

type DayData = {
    opening: number;
    closing: number;
};

type WeeklyReportData = {
    [key: string]: DayData;
};

interface WeeklyData {
    [day: string]: {
        opening: number;
        closing: number;
    };
}

interface CashBalanceData {
    labels: string[]; //* Fechas de los días
    datasets: {
        label: string;
        data: number[]; //* Valores del balance (apertura o cierre)
        borderColor: string; //* Color de la línea
        fill: boolean;
    }[];
}


export const processWeeklyReportData = (result: ReportData[]): WeeklyReportData => {
    const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

    const groupedData: WeeklyData = {
        Lunes: { opening: 0, closing: 0 },
        Martes: { opening: 0, closing: 0 },
        Miércoles: { opening: 0, closing: 0 },
        Jueves: { opening: 0, closing: 0 },
        Viernes: { opening: 0, closing: 0 },
        Sábado: { opening: 0, closing: 0 },
        Domingo: { opening: 0, closing: 0 },
    };

    result.forEach((entry) => {
        const dayIndex = new Date(entry.openTime).getDay(); // Obtiene el índice del día de la semana (0: Domingo, 1: Lunes, etc.)
        const dayName = days[dayIndex === 0 ? 6 : dayIndex - 1]; // Ajuste para que el 0 (Domingo) sea el último

        groupedData[dayName].opening += entry.openingBalance;
        groupedData[dayName].closing += entry.closingBalance;
    });

    return groupedData;
};

export const processDataForChart = (groupedData: WeeklyData): BarChartData => {
    const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

    const openingBalance: number[] = [];
    const closingBalance: number[] = [];

    days.forEach(day => {
        const dayData = groupedData[day] || { sales: 0, rentals: 0, expenses: 0, };
        openingBalance.push(dayData.opening);
        closingBalance.push(dayData.closing);
    });

    return {
        labels: days,
        datasets: [
            {
                label: 'Saldo Inicial',
                data: openingBalance,
                backgroundColor: ['rgb(63 145 145 / 84%)'],
            },
            {
                label: 'Saldo final',
                data: closingBalance,
                backgroundColor: ['rgb(54 162 235 / 84%)'],
            },
        ],
    };
};

export const processCashBalancesForChart = (cashRegisters: ReportData[]): CashBalanceData => {
    const labels: string[] = [];
    const openingBalances: number[] = [];
    const closingBalances: number[] = [];

    cashRegisters.forEach((register) => {
        const date = register.openTime.toLocaleDateString('es-ES'); // Convertimos la fecha a string
        labels.push(date);
        openingBalances.push(register.openingBalance);
        closingBalances.push(register.closingBalance);
    });

    return {
        labels, //* Fechas
        datasets: [
            {
                label: 'Saldo Inicial',
                data: openingBalances, //* Saldo de apertura
                borderColor: 'rgba(75, 192, 192, 1)', //* Color de la línea
                fill: false, //* No llenar el área bajo la línea
            },
            {
                label: 'Saldo Final',
                data: closingBalances, //* Saldo de cierre
                borderColor: 'rgba(255, 99, 132, 1)', //* Color de la línea
                fill: false,
            },
        ],
    };
};

export const processUtilitysForChart = (utilitysRegisters: ReportDataUtili[]): CashBalanceData => {

    const labels: string[] = [];
    const total: number[] = [];

    utilitysRegisters.forEach((register) => {
        const start = normalizeDateRe(register.startTime);
        const find = normalizeDateRe(register.endTime);
        labels.push(`${start} - ${find}`);
        total.push(register.total);
    });

    return {
        labels,
        datasets: [
            {
                label: 'Utilidad',
                data: total, //* Saldo de total
                borderColor: 'rgba(255, 99, 132, 1)', //* Color de la línea
                fill: false, //* No llenar el área bajo la línea
            },
        ],
    };
};
