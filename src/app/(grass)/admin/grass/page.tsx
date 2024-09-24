import { getRental } from '@/actions';
import { capitalize, currencyFormat, currentDate, separateDateTimeView } from '@/utils';

export default async function GrassPage() {

  const { status, cashStatus, rentals, total } = await getRental()

  return (
    <div className="bg-white p-8 rounded-md w-full">
      {
        (status) ?
          (
            <>
              <div className=" flex flex-col md:flex-row items-center justify-between pb-6">
                <h3 className="text-center font-bold text-base mb-2">Alquiler del día: {currencyFormat(total)}</h3>
                <div className="border-b-2 border-b-gray-400 py-2 px-4 flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-slate-800">
                    Estado de la caja: {cashStatus ? 'Abierta' : 'Cerrada'}
                  </h3>
                </div>
              </div>
              <div className="relative flex flex-col w-full h-full overflow-scroll text-gray-700 bg-white shadow-md rounded-lg bg-clip-border">
                <table className="w-full text-left table-auto min-w-max">
                  <thead>
                    <tr>
                      <th className="p-4 border-b border-slate-200 bg-slate-50">
                        <p className="block text-center font-semibold text-sm leading-none text-black">
                          Nombre
                        </p>
                      </th>
                      <th className="p-4 border-b border-slate-200 bg-slate-50">
                        <p className="block text-center font-semibold text-sm leading-none text-black">
                          DNI
                        </p>
                      </th>
                      <th className="p-4 border-b border-slate-200 bg-slate-50">
                        <p className="text-center text-sm block font-semibold leading-none ttext-black">
                          Celular
                        </p>
                      </th>
                      <th className="p-4 border-b border-slate-200 bg-slate-50">
                        <p className="text-center text-sm block font-semibold leading-none ttext-black">
                          Ingreso
                        </p>
                      </th>
                      <th className="p-4 border-b border-slate-200 bg-slate-50">
                        <p className="text-center text-sm block font-semibold leading-none ttext-black">
                          Salida
                        </p>
                      </th>
                      <th className="p-4 border-b border-slate-200 bg-slate-50">
                        <p className="text-center text-sm block font-semibold leading-none ttext-black">
                          Total
                        </p>
                      </th>
                      <th className="p-4 border-b border-slate-200 bg-slate-50">
                        <p className="text-center text-sm block font-semibold leading-none ttext-black">
                          Comentarios
                        </p>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      rentals.map(rental => (
                        <tr key={rental.id} className="hover:bg-slate-50 border-b border-slate-200">
                          <td className="p-4 py-5">
                            <p className="text-center text-md text-black">
                              {capitalize(rental.customerName)}
                            </p>
                          </td>
                          <td className="p-4 py-5">
                            <p className="text-center text-md text-black">
                              {rental.documentDni}
                            </p>
                          </td>
                          <td className="p-4 py-5">
                            <p className="text-center text-md text-black">
                              {rental.phone}
                            </p>
                          </td>
                          <td className="p-4 py-5">
                            <p className="text-center text-md text-black">
                              {separateDateTimeView(rental.startTime)}
                            </p>
                          </td>
                          <td className="p-4 py-5">
                            <p className="text-center text-md text-black">
                              {separateDateTimeView(rental.endTime)}
                            </p>
                          </td>
                          <td className="p-4 py-5">
                            <p className="text-center text-md text-black">
                              {currencyFormat(rental.total)}
                            </p>
                          </td>
                          <td className="p-4 py-5">
                            <p className="text-center text-md text-black">
                              {capitalize(rental.description || '-')}
                            </p>
                          </td>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
              </div>
            </>
          ) :
          (
            <>
              <h3>Actualmente no hay caja abierta</h3>
            </>
          )
      }
    </div>
  );
}