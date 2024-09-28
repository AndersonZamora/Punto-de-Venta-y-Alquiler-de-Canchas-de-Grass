'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { IoRemoveCircleOutline } from "react-icons/io5";
import { getBalanceAll, registerUtility } from "@/actions";
import { capitalize, closeAlert, currencyFormat, errorAlert, loadingAlert, successAlert } from "@/utils";

interface IReport {
    reportCahs: number,
    reportPurcha: number,
}

interface IUtili {
    id: string;
    description: string;
    price: number;
}

export const ContentUtil = () => {

    const router = useRouter();

    const [startTime, setDateInit] = useState('');
    const [endTime, setDateFin] = useState('');
    const [startTimeS, setDateInitS] = useState('');
    const [endTimeS, setDateFinS] = useState('');

    const [utilidades, setUtilidades] = useState<IReport>();
    const [total, setTotal] = useState(0);

    const [gastos, setGastos] = useState<IUtili[]>([]);
    const [totalGastos, setTotalGastos] = useState(0);

    const { handleSubmit, register, reset, formState: { errors } } = useForm<IUtili>();

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

    const handleBalanceAll = async () => {
        loadingAlert('Buscando...');
        const { status, message, report } = await getBalanceAll({ startTime, endTime });
        if (!status) {
            errorAlert(message);
            return;
        }

        closeAlert();
        setUtilidades(report);
    }

    useEffect(() => {
        if (startTime !== '' && endTime !== '') {
            setUtilidades(undefined);
            setGastos([]);
            setTotal(0);
            setTotalGastos(0);
            handleBalanceAll();
        }
    }, [startTime, endTime])

    const handleOnSubmit = (data: IUtili) => {
        const parsedData = {
            ...data,
            id: new Date().getTime().toString(),
            price: parseFloat(data.price.toString())
        };

        const newTtotal = total - parsedData.price;
        setTotal(+parseFloat(`${newTtotal}`).toFixed(2));
        setGastos([...gastos, parsedData]);
        reset({ description: '', price: 0, id: '' });
    }

    const handleDelete = (dele: IUtili) => {
        const newGastos = gastos.filter(p => p.id !== dele.id);
        setGastos(newGastos);
        const newTtotal = total + dele.price;
        setTotal(+parseFloat(`${newTtotal}`).toFixed(2));
    }

    useEffect(() => {
        if (utilidades !== undefined) {
            const subTotal = utilidades.reportCahs - utilidades.reportPurcha;
            setTotal(+parseFloat(`${subTotal}`).toFixed(2));
        }
    }, [utilidades]);

    useEffect(() => {
        const totalG = gastos.reduce((acc, curr) => acc + curr.price, 0);
        setTotalGastos(+parseFloat(`${totalG}`).toFixed(2));
    }, [gastos]);

    const handelRegisterUtil = async () => {

        loadingAlert('Registrando...');

        const data = { total, startTime, endTime }
        const { status, message } = await registerUtility(data);

        if (!status) {
            errorAlert(message);
            return;
        }

        successAlert('Utilidad registrada');
        router.replace('/admin/utilities');
    }

    return (
        <>
            <div className="transition-all mt-2 duration-300 bg-white p-4 rounded-lg shadow-md border-l-4 border-blue-600">
                <h2 className="text-2xl font-semibold mb-2 text-blue-600">Calcular utilidad</h2>
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
                {(utilidades) &&
                    (<>
                        <div className='w-full flex flex-col md:flex-row justify-center gap-2 items-center'>
                            <div className='w-full md:w-3/6'>
                                <div className='mt-2 rounded-md shadow-lg'>
                                    <div className="h-full py-8 px-6 space-y-6  rounded-xl border border-gray-200 bg-white">
                                        <>
                                            <h5 className="text-xl text-gray-600 text-center font-bold">Utilidad total</h5>
                                            <div className="mt-2 flex justify-center gap-4">
                                                <h3 className="text-3xl font-bold text-gray-700">{currencyFormat(total)}</h3>
                                            </div>
                                        </>
                                        <table className="w-full text-gray-600">
                                            <tbody>
                                                <tr>
                                                    <td className="py-2 font-bold">Utlidad del mes</td>
                                                    <td className="text-gray-500 font-bold">{currencyFormat(utilidades.reportCahs)}</td>
                                                </tr>
                                                <tr>
                                                    <td className="py-2 font-bold">Compras del mes</td>
                                                    <td className="text-gray-500 font-bold">{currencyFormat(utilidades.reportPurcha)}</td>
                                                </tr>
                                                <tr>
                                                    <td className="py-2 font-bold">Total de gastos</td>
                                                    <td className="text-gray-500 font-bold">{currencyFormat(totalGastos)}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <div className='flex justify-center mt-5 mb-5'>
                                            <button
                                                onClick={() => handelRegisterUtil()}
                                                className="w-[200px] md:w-[300px] text-center  rounded bg-orange-600 py-2.5 text-md font-semibold text-white"
                                                type="button"
                                            >
                                                Registrar utilidad
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='w-full md:w-3/6'>
                                <div className='mt-2 rounded-md shadow-lg'>
                                    <div className="h-full py-9 px-6 space-y-6 rounded-xl border border-gray-200 bg-white">
                                        <form onSubmit={handleSubmit(handleOnSubmit)} noValidate>
                                            <div className="flex flex-col mb-4">
                                                <span>Descripción</span>
                                                <input
                                                    type="text"
                                                    className="p-2 border rounded-md bg-gray-200"
                                                    {...register('description', {
                                                        required: { value: true, message: 'La descripción es requerida' }
                                                    })}
                                                />
                                                {errors.description && (<span className="text-red-500 font-mono">{errors.description?.message}</span>)}
                                            </div>
                                            <div className="flex flex-col mb-2">
                                                <span>Total del gasto</span>
                                                <input
                                                    type="text"
                                                    className="p-2 border rounded-md bg-gray-200"
                                                    {...register('price', {
                                                        required: { value: true, message: 'Precio requerido' },
                                                        pattern: { value: /^\d+(\.\d{1,2})?$/, message: 'Solo números' },
                                                        min: { value: 0.1, message: 'No puede ser cero' },
                                                        minLength: { value: 1, message: 'Ingrese al menos un número' },
                                                        maxLength: { value: 8, message: 'Número no valido' }
                                                    })}
                                                />
                                                {errors.price && (<span className="text-red-500 font-mono">{errors.price?.message}</span>)}
                                            </div>
                                            <p className="hidden md:block">&nbsp;</p>
                                            <div className='flex justify-center mt-5'>
                                                <button
                                                    className="w-[200px] md:w-[300px]  text-center  rounded bg-slate-800 py-2.5 text-md font-semibold text-white"
                                                    type="submit"
                                                >
                                                    Agregar gasto
                                                </button>
                                            </div>
                                        </form>

                                        <p className="hidden md:block">&nbsp;</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="relative flex flex-col mt-2 w-full h-full overflow-scroll text-gray-700 bg-white shadow-md rounded-lg bg-clip-border">
                            <table className="w-full text-left table-auto min-w-max">
                                <thead>
                                    <tr>
                                        <th className="p-4 border-b border-slate-200 bg-slate-50">
                                            <p className="block font-semibold text-sm leading-none text-black">
                                                Descripción
                                            </p>
                                        </th>
                                        <th className="p-4 border-b border-slate-200 bg-slate-50">
                                            <p className="text-center text-sm block font-semibold leading-none ttext-black">
                                                Total del gasto
                                            </p>
                                        </th>
                                        <th
                                            className="p-4 transition-colors cursor-pointer border-y border-slate-200 bg-slate-50 hover:bg-slate-100">
                                            <p
                                                className="flex items-center justify-between gap-2 font-sans text-sm  font-normal leading-none ttext-black">
                                            </p>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        gastos.map((gast) => (
                                            <tr key={gast.id} className="hover:bg-slate-50 border-b border-slate-200">
                                                <td className="p-4 py-5">
                                                    <p className="text-md text-black">
                                                        {capitalize(gast.description)}
                                                    </p>
                                                </td>
                                                <td className="p-4 py-5">
                                                    <p className="text-center text-md text-black">
                                                        {currencyFormat(gast.price)}
                                                    </p>
                                                </td>
                                                <td className="p-4 py-5">
                                                    <button
                                                        onClick={() => handleDelete(gast)}
                                                        className="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-slate-900 transition-all hover:bg-slate-900/10 active:bg-slate-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                                        type="button"
                                                    >
                                                        <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                                                            <IoRemoveCircleOutline className="w-5 h-5 text-red-700" />
                                                        </span>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </>)
                }
            </div>
        </>
    )
}
