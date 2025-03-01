'use client'

import { useEffect, useState } from 'react';
import { getRangesBalances, getTotals } from '@/actions';
import { closeAlert, currencyFormat, errorAlert, exportToExcel, loadingAlert, normalizrMonth, processCashBalancesForChart, successAlert } from '@/utils';
import { LineChartComponent } from './LineChartComponent';
import { IReportTotal } from '@/interfaces';

interface CashBalanceData {
  labels: string[]; //* Fechas de los días
  datasets: {
    label: string;
    data: number[]; //* Valores del balance (apertura o cierre)
    borderColor: string; //* Color de la línea
    fill: boolean;
  }[];
}

export const MonthlyReport = () => {

  const [viewDate, setViewDate] = useState('');
  const [control, setControl] = useState('');
  const [cashBalance, setCashBalance] = useState<CashBalanceData>();
  const [summary, setSummary] = useState<IReportTotal>();
  const [loading, setLoading] = useState(true);

  const onChangeSearch = (target: EventTarget & HTMLInputElement) => {
    if (target.value !== '') {
      setViewDate(target.value)
    }
  };

  const handlerMonthlyReport = async () => {

    loadingAlert('Buscando....');

    const { startOfMonth, endOfMonth } = normalizrMonth(viewDate)

    const { cashRegisters, report, status, message } = await getTotals({ startTime: startOfMonth, endTime: endOfMonth });

    if (!status) {
      errorAlert(message);
      return;
    }

    setSummary(report);
    const process = processCashBalancesForChart(cashRegisters);
    setCashBalance(process);
    closeAlert();
  }

  useEffect(() => {
    if (viewDate !== '') {
      if (control !== viewDate) {
        setControl(viewDate);
        handlerMonthlyReport();
      }
    }
  }, [viewDate])

  const handleDetail = async () => {

    try {
      loadingAlert('Generando archivo...');
      setLoading(false);

      const { startOfMonth, endOfMonth } = normalizrMonth(viewDate)

      const {
        status,
        message,
        newRentals,
        newSales,
        newExpenses,
        newProducts,
        newPurchaseProducts,
        newDocuments,
      } = await getRangesBalances({ startTime: startOfMonth, endTime: endOfMonth });

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
          title: 'Reporte_mensual_detallado'
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
      <div className='w-full flex flex-col items-center'>
        <div className='w-full md:w-2/6'>
          <input
            type='month'
            className="bg-white w-full pr-11 h-10 pl-3 py-2 bg-transparent placeholder:text-slate-700 text-slate-700 text-sm border border-slate-400 rounded transition duration-200 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md"
            placeholder="Buscar compra por fecha..."
            value={viewDate}
            onChange={value => onChangeSearch(value.target)}
          />
        </div>
      </div>
      <div className='p-3 grid items-center grid-cols-1 md:grid-cols-2 gap-2 mt-5'>
        <div className='rounded-md shadow-lg'>
          {
            (cashBalance) &&
            (<LineChartComponent data={cashBalance} title={'Evolución de Saldos de Caja Durante el Mes'} />)
          }
        </div>
        <div className=' rounded-md shadow-lg'>
          {
            (summary) &&
            (
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
            )
          }
        </div>
      </div>
    </>
  )
}
