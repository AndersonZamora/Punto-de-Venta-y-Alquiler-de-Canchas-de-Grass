import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

interface CashBalanceData {
    labels: string[]; //* Fechas de los días
    datasets: {
        label: string;
        data: number[]; //* Valores del balance (apertura o cierre)
        borderColor: string; //* Color de la línea
        fill: boolean;
    }[];
}

interface LineChartProps {
    data: CashBalanceData;
    title: string;
}

export const LineChartComponent: React.FC<LineChartProps> = ({ data, title }) => {
    return (
        <div className="w-full h-96">
            <Line
                data={data}
                options={{
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                        title: {
                            display: true,
                            text: `${title}`,
                        },
                    },
                }}
            />
        </div>
    );

}
