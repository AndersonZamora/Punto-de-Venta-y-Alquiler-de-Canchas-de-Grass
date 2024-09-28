'use client'

import { useEffect, useState } from 'react';
import { getCashBalancesForMonth } from '@/actions';
import { closeAlert, currencyFormat, errorAlert, loadingAlert, processCashBalancesForChart } from '@/utils';
import { LineChartComponent } from './LineChartComponent';

interface CashBalanceData {
  labels: string[]; //* Fechas de los días
  datasets: {
    label: string;
    data: number[]; //* Valores del balance (apertura o cierre)
    borderColor: string; //* Color de la línea
    fill: boolean;
  }[];
}

interface IMonth {
  totalSales: number;
  totalRentals: number;
  totalExpenses: number;
  closingBalance: number;
}

export const MonthlyReport = () => {

  const [viewDate, setViewDate] = useState('');
  const [control, setControl] = useState('');
  const [cashBalance, setCashBalance] = useState<CashBalanceData>();
  const [month, setMonth] = useState<IMonth>();

  const onChangeSearch = (target: EventTarget & HTMLInputElement) => {
    if (target.value !== '') {
      setViewDate(target.value)
    }
  };

  const handlerMonthlyReport = async () => {
    loadingAlert('Buscando....');
    const { cashRegisters, report, status, message } = await getCashBalancesForMonth(viewDate);

    if (!status) {
      errorAlert(message);
      return;
    }

    setMonth(report);
    const process = processCashBalancesForChart(cashRegisters);
    setCashBalance(process);
    closeAlert();
  }

  useEffect(() => {
    if (viewDate !== '') {
      if (control !== viewDate) {
        console.count('handlerMonthlyReport');
        setControl(viewDate);
        handlerMonthlyReport();
      }
    }
  }, [viewDate])

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
        <div className=' rounded-md shadow-lg'>
          {
            (cashBalance) &&
            (<LineChartComponent data={cashBalance} title={'Evolución de Saldos de Caja Durante el Mes'} />)
          }
        </div>
        <div className=' rounded-md shadow-lg'>
          {
            (month) &&
            (
              <div className="md:col-span-2 lg:col-span-1" >
                <div className="h-full py-8 px-6 space-y-6 rounded-xl border border-gray-200 bg-white">
                  <div>
                    <h5 className="text-xl text-gray-600 text-center">Saldo total</h5>
                    <div className="mt-2 flex justify-center gap-4">
                      <h3 className="text-3xl font-bold text-gray-700">{currencyFormat(month.closingBalance)}</h3>
                    </div>
                  </div>
                  <table className="w-full text-gray-600">
                    <tbody>
                      <tr>
                        <td className="py-2 font-bold">Total de ventas</td>
                        <td className="text-gray-500 font-bold">{currencyFormat(month.totalSales)}</td>
                      </tr>
                      <tr>
                        <td className="py-2 font-bold">Total de alquiler</td>
                        <td className="text-gray-500 font-bold">{currencyFormat(month.totalRentals)}</td>
                      </tr>
                      <tr>
                        <td className="py-2 font-bold">Total de gastos</td>
                        <td className="text-gray-500 font-bold">{currencyFormat(month.totalExpenses)}</td>
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
