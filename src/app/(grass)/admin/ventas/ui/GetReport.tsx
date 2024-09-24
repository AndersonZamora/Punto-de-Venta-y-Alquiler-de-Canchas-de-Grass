import Link from 'next/link';
import { IoEye } from 'react-icons/io5';
import { currencyFormat, currentDate } from '@/utils';

interface Props {
    totalSales: number;
    totalRentals: number;
    totalExpenses: number;
    total: number;
}

export const GetReport = ({ totalExpenses, totalRentals, totalSales, total }: Props) => {
    return (
        <>
            <div className="text-center fade-in">
                <h3 className="text-center font-bold text-xl mb-2">Ingresos</h3>
            </div>
            <Link className="fade-in px-4 flex justify-between mb-2 mt-2" href={"/admin/grass"}>
                <span className="font-semibold text-xl">Grass</span>
                <span className="flex gap-2 items-center font-bold text-xl">
                    <IoEye className="w-6 h-6 text-blue-600" />
                    {currencyFormat(totalRentals)}
                </span>
            </Link>
            <Link className="fade-in px-4 flex justify-between mb-4 mt-4" href={"/admin/bodega"}>
                <span className="font-semibold text-xl">Bodega</span>
                <span className="flex gap-2 items-center font-bold text-xl">
                    <IoEye className="w-6 h-6 text-blue-600" />
                    {currencyFormat(totalSales)}
                </span>
            </Link>
            <div className="fade-in px-4 flex justify-between ">
                <span className="font-semibold text-xl">Gastos</span>
                <span className=" items-center font-bold text-xl">
                    {currencyFormat(totalExpenses)}
                </span>
            </div>
            <div className="fade-in border-t-2 border-t-gray-400 mt-3 py-2 px-4 flex items-center justify-between">
                <span className="font-semibold text-2xl">Total</span>
                <span className="font-bold text-2xl">{currencyFormat(total - totalExpenses)}</span>
            </div>
        </>
    )
}
