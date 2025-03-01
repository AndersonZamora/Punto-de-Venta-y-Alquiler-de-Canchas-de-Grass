'use client';

import { useEffect, useState } from 'react';
import { getRangesBalances, getTotals } from '@/actions';
import { closeAlert, currencyFormat, errorAlert, exportToExcel, getStartDateOfWeek, loadingAlert, normalizrWeekly, processDataForChart, processWeeklyReportData, successAlert } from '@/utils';
import { WeekBarChartComponent } from './WeekBarChartComponent';
import { IReportTotal } from '@/interfaces';

interface BarChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string[];
  }[];
}

export const WeeklyReport = () => {

  const [dateSelect, setDateSelect] = useState<Date>();
  const [viewDete, setViewDate] = useState('');
  const [control, setControl] = useState('');
  const [WeeklyReport, setWeeklyReport] = useState<BarChartData>();
  const [summary, setSummary] = useState<IReportTotal>();
  const [loading, setLoading] = useState(true);

  const onChangeSearch = (target: EventTarget & HTMLInputElement) => {
    if (target.value !== '') {
      const convertWeek = getStartDateOfWeek(`${target.value}`);
      setDateSelect(convertWeek);
      setViewDate(target.value)
    }
  };

  const handleReportWeekly = async () => {

    loadingAlert('Buscando....');

    const { startOfWeek, endOfWeek } = normalizrWeekly(dateSelect as Date)

    const { report, cashRegisters, status, message } = await getTotals({ startTime: startOfWeek, endTime: endOfWeek });

    if (!status) {
      errorAlert(message);
      return;
    }

    setSummary(report);
    const pross = processWeeklyReportData(cashRegisters);
    const forChart = processDataForChart(pross);
    setWeeklyReport(forChart);
    closeAlert();
  }

  useEffect(() => {
    if (viewDete !== '') {
      if (control !== viewDete) {
        setControl(viewDete)
        handleReportWeekly();
      }
    }
  }, [viewDete]);

  const handleDetail = async () => {

    try {
      loadingAlert('Generando archivo...');
      setLoading(false);

      const { startOfWeek, endOfWeek } = normalizrWeekly(dateSelect as Date)

      const {
        status,
        message,
        newRentals,
        newSales,
        newExpenses,
        newProducts,
        newPurchaseProducts,
        newDocuments,
      } = await getRangesBalances({ startTime: startOfWeek, endTime: endOfWeek });

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
            summary: summary || { totalExpenses: 0, totalPurchas: 0, totalRentals: 0, totalSales: 0 },
          },
          title: "Reporte_semanal"
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
            type='week'
            className="bg-white w-full pr-11 h-10 pl-3 py-2 bg-transparent placeholder:text-slate-700 text-slate-700 text-sm border border-slate-400 rounded transition duration-200 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md"
            placeholder="Buscar compra por fecha..."
            value={viewDete}
            onChange={value => onChangeSearch(value.target)}
          />
        </div>
      </div>
      <div className='p-3 grid items-center grid-cols-1 md:grid-cols-2 gap-2 mt-5'>
        <div className=' rounded-md shadow-lg'>
          {
            (WeeklyReport) &&
            (
              <WeekBarChartComponent data={WeeklyReport} />
            )
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
                    onClick={() => handleDetail()}
                    disabled={!loading}

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
