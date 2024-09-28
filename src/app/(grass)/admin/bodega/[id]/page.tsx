import { notFound } from 'next/navigation';
import { getSales } from '@/actions';
import { TablaBodega } from './ui/TablaBodega';
import { currencyFormat } from '@/utils';

interface Props {
    params: {
        id: string;
    }
}

export default async function VentaByIdPage({ params }: Props) {

    const id = params.id

    const { ventas, total, status, cashStatus } = await getSales({ id });

    if (!status) {
        notFound();
    }

    return (
        <div className="bg-white p-8 rounded-md w-full">
            <div className=" flex flex-col md:flex-row items-center justify-between pb-6">
                <h3 className="text-center font-bold text-base mb-2">Ventas del día: {currencyFormat(total)}</h3>
                <div className="border-b-2 border-b-gray-400 py-2 px-4 flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-slate-800">
                        Estado de la caja: {cashStatus ? 'Abierta' : 'Cerrada'}
                    </h3>
                </div>
            </div>
            <div>
                <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                    <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                        <TablaBodega ventas={ventas} />
                    </div>
                </div>
            </div>
        </div>
    );
}
