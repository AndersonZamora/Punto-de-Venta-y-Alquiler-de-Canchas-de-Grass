'use client';

import { useEffect, useState } from 'react';
import { getRangesBalances } from '@/actions';
import { capitalize, closeAlert, currencyFormat, errorAlert, loadingAlert, normalizeReport, processCashBalancesForChart } from '@/utils';
import { LineChartComponent } from './LineChartComponent';

interface IReportRange {
  id: string;
  openedBy: string;
  closedBy: string | null;
  openTime: Date;
  openingBalance: number;
  closingBalance: number;
  totalSales: number;
  totalRentals: number;
  totalExpenses: number;
}

interface CashBalanceData {
  labels: string[]; //* Fechas de los días
  datasets: {
    label: string;
    data: number[]; //* Valores del balance (apertura o cierre)
    borderColor: string; //* Color de la línea
    fill: boolean;
  }[];
}

interface IReporD {
  balance: number;
  sales: number;
  rentals: number;
  expenses: number;
}

export const RangesReport = () => {

  const [startTime, setDateInit] = useState('');
  const [endTime, setDateFin] = useState('');
  const [startTimeS, setDateInitS] = useState('');
  const [endTimeS, setDateFinS] = useState('');
  const [reports, setReports] = useState<IReportRange[]>([]);
  const [summary, setSummary] = useState<IReporD>();
  const [cashBalance, setCashBalance] = useState<CashBalanceData>();

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
    
    const { status, message, cashRegisters, reportd } = await getRangesBalances({ startTime, endTime });

    if (!status) {
      errorAlert(message);
      return;
    }

    const process = processCashBalancesForChart(cashRegisters);
    setCashBalance(process)

    setReports(cashRegisters);
    setSummary({ ...reportd });
    closeAlert();
  }

  useEffect(() => {
    if (startTime !== '' && endTime !== '') {
      handleGetReport();
    }
  }, [startTime, endTime])

  return (
    <>
      <div className='w-full flex flex-col md:flex-row justify-center gap-2 items-center'>
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

              <div className='w-full md:w-3/6'>
                {
                  (cashBalance) &&
                  (<LineChartComponent data={cashBalance} title={'Evolución por rangos de fecha'} />)
                }
              </div>
              <div className='w-full md:w-3/6'>
                <div className='mt-2 rounded-md shadow-lg'>
                  <div className="md:col-span-2 lg:col-span-1" >
                    <div className="h-full py-8 px-6 space-y-6 rounded-xl border border-gray-200 bg-white">
                      <div>
                        <h5 className="text-xl text-gray-600 text-center">Monto total</h5>
                        <div className="mt-2 flex justify-center gap-4">
                          <h3 className="text-3xl font-bold text-gray-700">{currencyFormat(summary.balance)}</h3>
                        </div>
                      </div>
                      <table className="w-full text-gray-600">
                        <tbody>
                          <tr>
                            <td className="py-2 font-bold">Total de ventas</td>
                            <td className="text-gray-500 font-bold">{currencyFormat(summary.sales)}</td>
                          </tr>
                          <tr>
                            <td className="py-2 font-bold">Total de alquiler</td>
                            <td className="text-gray-500 font-bold">{currencyFormat(summary.rentals)}</td>
                          </tr>
                          <tr>
                            <td className="py-2 font-bold">Total de gastos</td>
                            <td className="text-gray-500 font-bold">{currencyFormat(summary.expenses)}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative mt-5 flex flex-col w-full h-full overflow-scroll text-gray-700 bg-white shadow-md rounded-lg bg-clip-border">
              <table className="w-full text-left table-auto min-w-max">
                <thead>
                  <tr>
                    <th className="p-4 border-b border-slate-200 bg-slate-50">
                      <p className="block text-start font-semibold text-md leading-none text-black">
                        Fecha
                      </p>
                    </th>
                    <th className="p-4 border-b border-slate-200 bg-slate-50">
                      <p className="block text-center font-semibold text-md leading-none text-black">
                        Abrio
                      </p>
                    </th>
                    <th className="p-4 border-b border-slate-200 bg-slate-50">
                      <p className="block text-center font-semibold text-md leading-none text-black">
                        Saldo inicial
                      </p>
                    </th>
                    <th className="p-4 border-b border-slate-200 bg-slate-50">
                      <p className="block text-center font-semibold text-md leading-none text-black">
                        Bodega
                      </p>
                    </th>
                    <th className="p-4 border-b border-slate-200 bg-slate-50">
                      <p className="block text-center font-semibold text-md leading-none text-black">
                        Grass
                      </p>
                    </th>
                    <th className="p-4 border-b border-slate-200 bg-slate-50">
                      <p className="text-center text-sm block font-semibold leading-none text-black">
                        Gastos
                      </p>
                    </th>
                    <th className="p-4 border-b border-slate-200 bg-slate-50">
                      <p className="text-center text-sm block font-semibold leading-none text-black">
                        Cierre de caja
                      </p>
                    </th>
                    <th className="p-4 border-b border-slate-200 bg-slate-50">
                      <p className="text-center text-sm block font-semibold leading-none text-black">
                        Cerro
                      </p>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {
                    reports.map(report => (
                      <tr key={report.id} className="hover:bg-slate-50 border-b border-slate-200">
                        <td className="p-4 py-5">
                          <p className="text-start text-md text-black">
                            {normalizeReport(report.openTime)}
                          </p>
                        </td>
                        <td className="p-4 py-5">
                          <p className="text-center text-md text-black">
                            {capitalize(report.openedBy)}
                          </p>
                        </td>
                        <td className="p-4 py-5">
                          <p className="text-center text-md text-black">
                            {currencyFormat(report.openingBalance)}
                          </p>
                        </td>
                        <td className="p-4 py-5">
                          <p className="text-center text-md text-black">
                            {currencyFormat(report.totalSales)}
                          </p>
                        </td>
                        <td className="p-4 py-5">
                          <p className="text-center text-md text-black">
                            {currencyFormat(report.totalRentals)}
                          </p>
                        </td>
                        <td className="p-4 py-5">
                          <p className="text-center text-md text-black">
                            {currencyFormat(report.totalExpenses)}
                          </p>
                        </td>
                        <td className="p-4 py-5">
                          <p className="text-center text-md text-black">
                            {currencyFormat(report.closingBalance)}
                          </p>
                        </td>
                        <td className="p-4 py-5">
                          <p className="text-center text-md text-black">
                            {capitalize(report.closedBy || '-')}
                          </p>
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </div>
          </>
        )
      }
    </>
  )
}
