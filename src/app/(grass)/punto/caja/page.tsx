import Link from 'next/link';
import { cashStatus } from '@/actions';
import { capitalize, currencyFormat, currentDate, dateServerSale, dateServerStart, normalizeDate } from '@/utils';
import { ActionsCaja } from './ui/ActionsCaja';
import { ActionsOpenCaja } from './ui/ActionsOpenCaja';

export default async function CajaPage() {

  const { cashRegister, gastos, subTotal } = await cashStatus({ search: dateServerStart() });

  return (
    <div className='fade-in'>
      <h3 className="text-3xl font-medium text-gray-700">Caja - {currentDate()} </h3>
      <div className="mt-4">
        {
          (cashRegister) ?
            (
              <div className="bg-white rounded-xl">
                <ActionsOpenCaja id={cashRegister.id} status={cashRegister.status} />
                <div className=" p-3 grid items-center grid-cols-1 md:grid-cols-2 gap-1 mx-auto mt-5">
                  <div className="py-4 rounded-md shadow-lg">
                    <div className="border-t-2 border-t-gray-400 px-4 flex flex-col items-center">
                      <span className="font-semibold text-xl mt-1">Responsable</span>
                      <span className="font-bold text-xl">{cashRegister.openedBy}</span>
                    </div>
                  </div>
                  <div className="py-4 rounded-md shadow-lg">
                    <div className="flex flex-col items-center border-t-2 border-t-gray-400 font-semibold px-4">
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
                      href={"/punto/ventas"}
                    >
                      <span className="font-semibold text-xl">Total de ventas</span>
                      <span className="flex gap-2 font-bold text-xl">
                        {currencyFormat(cashRegister.totalSales)}
                      </span>
                    </Link>
                    <Link
                      className="px-2 md:px-4 flex justify-between"
                      href={"/punto/grass"}
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
                      <span className="font-semibold text-xl">Total</span>
                      <span className="font-bold text-xl">{currencyFormat(cashRegister.closingBalance)}</span>
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
              </div>
            )
            : (<ActionsCaja isOpen={!!cashRegister} />)
        }
      </div>
    </div>
  );
}
