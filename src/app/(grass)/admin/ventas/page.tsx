import Link from 'next/link';
import { cashStatus } from '@/actions';
import { capitalize, currencyFormat, normalizeDate } from '@/utils';
import { SelectDate } from './ui/SelectDate';

interface Props {
    searchParams: {
        search?: string
    }
}

export default async function VentasPage({ searchParams }: Props) {

    const search = searchParams.search || '';
    const { cashRegister, gastos, subTotal } = await cashStatus({ search });

    return (
        <div className="px-2 md:px-5 fade-in">
            {
                (cashRegister)
                    ? (
                        <>
                            <div className=" relative overflow-hidden text-slate-700 rounded-none bg-clip-border">
                                <h3 className="text-lg font-semibold text-slate-800">Reporte de caja del día: {normalizeDate(cashRegister.openTime)} </h3>
                                <h3 className="text-lg font-semibold text-slate-800">
                                    Estado de la caja: {cashRegister.status ? 'Abierta' : 'Cerrada'}
                                </h3>
                                {
                                    cashRegister.closeTime && (
                                        <h3 className="text-lg font-semibold text-slate-800">
                                            Fecha de cierre: {normalizeDate(cashRegister.closeTime)}
                                        </h3>
                                    )
                                }
                                {
                                    cashRegister.closedBy && (
                                        <h3 className="text-lg font-semibold text-slate-800">
                                            Usuario que cerro caja: {cashRegister.closedBy}
                                        </h3>
                                    )
                                }
                            </div>
                            <div className="bg-white rounded-xl mt-4">
                                <SelectDate search={search} title={"Seleccionar otra caja"} />
                                <div className="p-3 grid items-center grid-cols-1 md:grid-cols-2 gap-1 mt-5">
                                    <div className="py-4 rounded-md shadow-lg">
                                        <div className="border-t-2 border-t-gray-400 flex flex-col items-center">
                                            <span className="font-semibold text-xl mt-1">Responsable</span>
                                            <span className="font-bold text-xl">{cashRegister.openedBy}</span>
                                        </div>
                                    </div>
                                    <div className="py-4 rounded-md shadow-lg">
                                        <div className="flex flex-col items-center border-t-2 border-t-gray-400 font-semibold">
                                            <span className="text-xl mt-2">Fecha de apertura</span>
                                            <span className="font-bold text-md">{normalizeDate(cashRegister?.openTime || new Date())}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-3 grid items-center grid-cols-1 md:grid-cols-2 gap-1 mx-auto mt-1">
                                    <div className="py-4  rounded-md shadow-lg">
                                        <h3 className="text-center font-bold text-xl">Ingresos</h3>
                                        <Link
                                            className="px-2 md:px-4 flex justify-between mt-2"
                                            href={`/admin/bodega/${cashRegister.id}`}
                                        >
                                            <span className="font-semibold text-xl">Total de ventas</span>
                                            <span className="flex gap-2 font-bold text-xl">
                                                {currencyFormat(cashRegister.totalSales)}
                                            </span>
                                        </Link>
                                        <Link
                                            className="px-2 md:px-4 flex justify-between"
                                            href={`/admin/grass/${cashRegister.id}`}
                                        >
                                            <span className="font-semibold text-xl">Total de alquiler</span>
                                            <span className="flex gap-2 font-bold text-xl">
                                                {currencyFormat(cashRegister.totalRentals || 0)}
                                            </span>
                                        </Link>
                                        <div className="px-2 md:px-4 justify-between hidden md:flex">
                                            <span className="font-semibold text-xl">&nbsp;</span>
                                        </div>
                                        <div className="border-t-2 border-t-gray-400 mt-3 py-2 px-2 md:px-4 flex items-center justify-between">
                                            <span className="font-semibold text-xl">SubTotal</span>
                                            <span className="font-bold text-xl">{currencyFormat(subTotal)}</span>
                                        </div>
                                    </div>
                                    <div className="py-4 rounded-md shadow-lg">
                                        <h3 className="text-center font-bold text-xl">Saldo de cierre</h3>
                                        <div className="px-2 md:px-4 flex justify-between mt-2">
                                            <span className="font-semibold text-xl">Saldo de apertura</span>
                                            <span className="font-bold text-xl">{currencyFormat(cashRegister.openingBalance)}</span>
                                        </div>
                                        <div className="px-2 md:px-4 flex justify-between">
                                            <span className="font-semibold text-xl">SubTotal</span>
                                            <span className="font-bold text-xl">{currencyFormat(subTotal)}</span>
                                        </div>
                                        <div className="px-2 md:px-4  flex justify-between">
                                            <span className="font-semibold text-xl">Gastos</span>
                                            <span className="font-bold text-xl">{currencyFormat(cashRegister.totalExpenses)}</span>
                                        </div>
                                        <div className="border-t-2 border-t-gray-400 mt-3 py-2 px-2 md:px-4 flex items-center justify-between">
                                            <span className="font-semibold text-xl">Saldo de cierre</span>
                                            <span className="font-bold text-xl">{currencyFormat(cashRegister.closingBalance)}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col items-center justify-center">
                                <div className=" mb-2 w-full lg:w-4/5">
                                    <div className="px-5 mt-5">
                                        <div className=" py-4 bg-white rounded-md shadow-lg">
                                            <h3 className="text-center font-bold text-xl mb-2">Gastos del día</h3>
                                            {
                                                gastos.map(data => (
                                                    <div key={data.id} className="px-4 mb-2 ">
                                                        <span className="focus:outline-none text-lg font-medium leading-5 text-gray-800  mt-2">
                                                            {capitalize(data.description)} - {currencyFormat(data.amount)}
                                                        </span>
                                                        <div className="border-b mb-2 mt-2  border-gray-400 border-dashed"></div>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        <SelectDate search={search} title={"No encontramos ninguna caja, intente con otra fecha"} />
                    )
            }
        </div>
    );
}