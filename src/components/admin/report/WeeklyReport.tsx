'use client';

import { useEffect, useState } from 'react';
import { getWeeklyReportReport } from '@/actions';
import { closeAlert, currencyFormat, errorAlert, getStartDateOfWeek, loadingAlert, processDataForChart, processWeeklyReportData } from '@/utils';
import { WeekBarChartComponent } from './WeekBarChartComponent';

interface BarChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string[];
  }[];
}

interface IWeekl {
  totalSales: number;
  totalRentals: number;
  totalExpenses: number;
  closingBalance: number;
}

export const WeeklyReport = () => {

  const [dateSelect, setDateSelect] = useState<Date>();
  const [viewDete, setViewDate] = useState('');
  const [control, setControl] = useState('');
  const [Weekl, setWeekl] = useState<IWeekl>();
  const [WeeklyReport, setWeeklyReport] = useState<BarChartData>();

  const onChangeSearch = (target: EventTarget & HTMLInputElement) => {
    if (target.value !== '') {
      const convertWeek = getStartDateOfWeek(`${target.value}`);
      setDateSelect(convertWeek);
      setViewDate(target.value)
    }
  };

  const handleReportWeekly = async () => {
    loadingAlert('Buscando....');
    
    const { report, result, status, message } = await getWeeklyReportReport(dateSelect as Date);

    if (!status) {
      errorAlert(message);
      return;
    }

    setWeekl({ ...report });
    const pross = processWeeklyReportData(result);
    const forChart = processDataForChart(pross);
    setWeeklyReport(forChart);
    closeAlert();
  }

  useEffect(() => {
    if (viewDete !== '') {
      if (control !== viewDete) {
        console.count('handleReportWeekly');
        setControl(viewDete)
        handleReportWeekly();
      }
    }
  }, [viewDete]);

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
            (Weekl) &&
            (
              <div className="md:col-span-2 lg:col-span-1" >
                <div className="h-full py-8 px-6 space-y-6 rounded-xl border border-gray-200 bg-white">
                  <div>
                    <h5 className="text-xl text-gray-600 text-center">Saldo total</h5>
                    <div className="mt-2 flex justify-center gap-4">
                      <h3 className="text-3xl font-bold text-gray-700">{currencyFormat(Weekl.closingBalance)}</h3>
                    </div>
                  </div>
                  <table className="w-full text-gray-600">
                    <tbody>
                      <tr>
                        <td className="py-2 font-bold">Total de ventas</td>
                        <td className="text-gray-500 font-bold">{currencyFormat(Weekl.totalSales)}</td>
                      </tr>
                      <tr>
                        <td className="py-2 font-bold">Total de alquiler</td>
                        <td className="text-gray-500 font-bold">{currencyFormat(Weekl.totalRentals)}</td>
                      </tr>
                      <tr>
                        <td className="py-2 font-bold">Total de gastos</td>
                        <td className="text-gray-500 font-bold">{currencyFormat(Weekl.totalExpenses)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )
          }
        </div>
      </div>
    </>
  )
}
