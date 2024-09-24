
interface ReportData {
    openTime: Date;
    totalSales: number;
    totalRentals: number;
    totalExpenses: number;
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
    sales: number;
    rentals: number;
    expenses: number;
};


type WeeklyReportData = {
    [key: string]: DayData;
};

interface WeeklyData {
    [day: string]: {
        sales: number;
        rentals: number;
        expenses: number;
    };
}

export const processWeeklyReportData = (result: ReportData[]): WeeklyReportData => {
    const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

    const groupedData: WeeklyData = {
        Lunes: { sales: 0, rentals: 0, expenses: 0 },
        Martes: { sales: 0, rentals: 0, expenses: 0 },
        Miércoles: { sales: 0, rentals: 0, expenses: 0 },
        Jueves: { sales: 0, rentals: 0, expenses: 0 },
        Viernes: { sales: 0, rentals: 0, expenses: 0 },
        Sábado: { sales: 0, rentals: 0, expenses: 0 },
        Domingo: { sales: 0, rentals: 0, expenses: 0 },
    };

    result.forEach((entry) => {
        const dayIndex = new Date(entry.openTime).getDay(); // Obtiene el índice del día de la semana (0: Domingo, 1: Lunes, etc.)
        const dayName = days[dayIndex === 0 ? 6 : dayIndex - 1]; // Ajuste para que el 0 (Domingo) sea el último

        groupedData[dayName].sales += entry.totalSales;
        groupedData[dayName].rentals += entry.totalRentals;
        groupedData[dayName].expenses += entry.totalExpenses;
    });

    return groupedData;
};

export const processDataForChart = (groupedData: WeeklyData): BarChartData => {
    const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

    const salesData: number[] = [];
    const rentalsData: number[] = [];
    const expensesData: number[] = [];

    days.forEach(day => {
        const dayData = groupedData[day] || { sales: 0, rentals: 0, expenses: 0 };
        salesData.push(dayData.sales);
        rentalsData.push(dayData.rentals);
        expensesData.push(dayData.expenses);
    });

    return {
        labels: days,
        datasets: [
            {
                label: 'Ventas',
                data: salesData,
                backgroundColor: ['rgba(75, 192, 192, 0.2)'],
            },
            {
                label: 'Alquileres',
                data: rentalsData,
                backgroundColor: ['rgba(54, 162, 235, 0.2)'],
            },
            {
                label: 'Gastos',
                data: expensesData,
                backgroundColor: ['rgba(255, 99, 132, 0.2)'],
            },
        ],
    };
};
