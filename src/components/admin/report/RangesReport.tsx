'use client';

import { useEffect, useState } from 'react';
import { getRangesBalances, getTotals } from '@/actions';
import { closeAlert, currencyFormat, errorAlert, exportToExcel, loadingAlert, processCashBalancesForChart, successAlert } from '@/utils';
import { LineChartComponent } from './LineChartComponent';
import { IReportTotal } from '@/interfaces';

interface CashBalanceData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    fill: boolean;
  }[];
}

export const RangesReport = () => {

  const [startTime, setDateInit] = useState('');
  const [endTime, setDateFin] = useState('');
  const [startTimeS, setDateInitS] = useState('');
  const [endTimeS, setDateFinS] = useState('');
  const [summary, setSummary] = useState<IReportTotal>();
  const [cashBalance, setCashBalance] = useState<CashBalanceData>();
  const [loading, setLoading] = useState(true);

  const onChangeInit = (target: EventTarget & HTMLInputElement) => {
    if (target.value !== '') {
      setDateInitS(target.value)
      setDateInit(new Date(target.value).toISOString())
    }
  };

  const onChangeFin = (target: EventTarget & HTMLInputElement) => {
    if (target.value !== '') {
      setDateFinS(target.value)
      setDateFin(new Date(target.value).toISOString())
    }
  };

  const handleGetReport = async () => {
    loadingAlert('Buscando');

    const { status, message, cashRegisters, report } = await getTotals({ startTime, endTime });

    if (!status) {
      errorAlert(message);
      return;
    }

    setLoading(true);
    const process = processCashBalancesForChart(cashRegisters);
    setCashBalance(process)
    setSummary({ ...report });
    closeAlert();
  }

  useEffect(() => {
    if (startTime !== '' && endTime !== '') {
      setSummary(undefined);
      handleGetReport();
    }
  }, [startTime, endTime])

  const handleDetail = async () => {

    try {
      loadingAlert('Generando archivo...');
      setLoading(false);

      const {
        status,
        message,
        newRentals,
        newSales,
        newExpenses,
        newProducts,
        newPurchaseProducts,
        newDocuments,
      } = await getRangesBalances({ startTime, endTime });

      if (!status) {
        errorAlert(message);
        return;
      }

      try {
        await exportToExcel({
          detailData: {
            newRentals,
            newSales,
            newExpenses,
            newProducts,
            newPurchaseProducts,
            newDocuments,
            summary: summary || { totalExpenses: 0, totalPurchas: 0, totalRentals: 0, totalSales: 0 }
          },
          title: "Reporte_por_rango_de_fechas"
        })
      } catch {
        errorAlert('No pudimos generear el detalle, contacte con CinCout')
      }
      finally {
        successAlert("Detalle generado, vea en descargas")
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error no controlado - contacte a CinCout';
      successAlert(errorMessage)
    }
  }

  return (
    <>
      <div className='w-full flex flex-col md:flex-row justify-center gap-2 items-center mt-3 mb-5'>
        <div className='w-full md:w-2/6'>
          <span>Inicio</span>
          <input
            type='date'
            className="bg-white w-full pr-11 h-10 pl-3 py-2 bg-transparent placeholder:text-slate-700 text-slate-700 text-sm border border-slate-400 rounded transition duration-200 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md"
            placeholder="Inicio"
            value={startTimeS}
            onChange={value => onChangeInit(value.target)}
          />
        </div>
        <div className='w-full md:w-2/6'>
          <span>Fin</span>
          <input
            type='date'
            disabled={!startTimeS}
            className="bg-white w-full pr-11 h-10 pl-3 py-2 bg-transparent placeholder:text-slate-700 text-slate-700 text-sm border border-slate-400 rounded transition duration-200 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md"
            placeholder="Fin"
            value={endTimeS}
            onChange={value => onChangeFin(value.target)}
          />
        </div>
      </div>
      {
        (summary) &&
        (
          <>
            <div className='w-full flex flex-col-reverse md:flex-row justify-center gap-2 items-center'>

              <div className='rounded-md shadow-lg w-full md:w-3/6'>
                {
                  (cashBalance) &&
                  (<LineChartComponent data={cashBalance} title={'Evolución por rangos de fecha'} />)
                }
              </div>
              <div className='w-full md:w-3/6'>
                <div className='rounded-md shadow-lg'>
                  <div className="md:col-span-2 lg:col-span-1" >
                    <div className="h-full py-8 px-6 space-y-6 rounded-xl border border-gray-200 bg-white">
                      <div className='hidden md:block'>
                        <h5 className="text-xl text-gray-600 text-center">&nbsp;</h5>
                      </div>
                      <table className="w-full text-gray-600">
                        <tbody>
                          <tr>
                            <td className="py-2 font-bold">Total de ventas</td>
                            <td className="text-gray-500 font-bold">{currencyFormat(summary.totalSales)}</td>
                          </tr>
                          <tr>
                            <td className="py-2 font-bold">Total de alquiler</td>
                            <td className="text-gray-500 font-bold">{currencyFormat(summary.totalRentals)}</td>
                          </tr>
                          <tr>
                            <td className="py-2 font-bold">Total de gastos</td>
                            <td className="text-gray-500 font-bold">{currencyFormat(summary.totalExpenses)}</td>
                          </tr>
                          <tr>
                            <td className="py-2 font-bold">Total de compras</td>
                            <td className="text-gray-500 font-bold">{currencyFormat(summary.totalPurchas)}</td>
                          </tr>
                        </tbody>
                      </table>
                      <button
                        type='button'
                        disabled={!loading}
                        onClick={() => handleDetail()}
                        className='w-full px-4 py-2 rounded-md  text-center font-semibold bg-yellow-500 text-white'
                      >
                        Descargar detalle
                      </button>
                      <div className='hidden md:block'>
                        <h5 className="text-sm text-gray-600 text-center">&nbsp;</h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )
      }
    </>
  )
}
