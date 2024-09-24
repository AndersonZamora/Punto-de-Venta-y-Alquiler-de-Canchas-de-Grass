'use client';

import { Bar } from 'react-chartjs-2';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);


interface BarChartComponentProps {
    data: {
        labels: string[];
        datasets: {
            label: string;
            data: number[];
            backgroundColor: string[];
        }[];
    };

    options?: any;
}

export const WeekBarChartComponent: React.FC<BarChartComponentProps> = ({ data, options }) => {
    return (
        <div className="w-full h-96">
            <Bar data={data} options={options} />
        </div>
    )
}
