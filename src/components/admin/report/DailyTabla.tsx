import React from 'react'

export const DailyTabla = () => {
    return (
        <table className="min-w-full bg-white border border-gray-300">
            <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                    <th className="py-3 px-6 text-left">Fecha</th>
                    <th className="py-3 px-6 text-left">Apertura</th>
                    <th className="py-3 px-6 text-left">Ventas</th>
                    <th className="py-3 px-6 text-left">Alquileres</th>
                    <th className="py-3 px-6 text-left">Gastos</th>
                    <th className="py-3 px-6 text-left">Cierre</th>
                </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
                <tr className="border-b border-gray-300 hover:bg-gray-100">
                    <td className="py-3 px-6 text-left whitespace-nowrap">23/09/2024</td>
                    <td className="py-3 px-6 text-left whitespace-nowrap">$500</td>
                    <td className="py-3 px-6 text-left whitespace-nowrap">$300</td>
                    <td className="py-3 px-6 text-left whitespace-nowrap">$200</td>
                    <td className="py-3 px-6 text-left whitespace-nowrap">$100</td>
                    <td className="py-3 px-6 text-left whitespace-nowrap">$900</td>
                </tr>
            </tbody>
        </table>
    )
}
