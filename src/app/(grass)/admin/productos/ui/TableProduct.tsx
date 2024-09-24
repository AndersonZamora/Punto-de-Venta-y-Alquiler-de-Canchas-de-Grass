import Link from 'next/link';
import clsx from 'clsx';
import { IoPencilSharp } from 'react-icons/io5';
import { IProduct } from '@/interfaces';
import { capitalize, currencyFormat } from '@/utils';

interface Props {
    products: IProduct[];
}

export const TableProduct = ({ products }: Props) => {
    return (
        <table className="w-full text-left table-auto min-w-max">
            <thead>
                <tr>
                    <th className="p-4 border-b border-slate-200 bg-slate-50">
                        <p className="block font-semibold text-sm leading-none text-black">
                            Producto
                        </p>
                    </th>
                    <th className="p-4 border-b border-slate-200 bg-slate-50">
                        <p className="text-center text-sm block font-semibold leading-none ttext-black">
                            Stock
                        </p>
                    </th>
                    <th className="p-4 border-b border-slate-200 bg-slate-50">
                        <p className="text-center text-sm block font-semibold leading-none ttext-black">
                            Precio Compra
                        </p>
                    </th>
                    <th className="p-4 border-b border-slate-200 bg-slate-50">
                        <p className="text-center text-sm block font-semibold leading-none ttext-black">
                            Precio Venta
                        </p>
                    </th>
                    <th className="p-4 border-b border-slate-200 bg-slate-50">
                        <p className="text-center text-sm block font-semibold leading-none ttext-black">
                            Estado
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
                    products.map(product => (
                        <tr key={product.id} className="hover:bg-slate-50 border-b border-slate-200">
                            <td className="p-4 py-5">
                                <p className="text-md text-black">
                                    {capitalize(product.description)}
                                </p>
                            </td>
                            <td className="p-4 py-5">
                                <div
                                    className={
                                        clsx(
                                            'relative grid items-center px-2 py-1 font-sans text-md font-bold  uppercase rounded-md select-none whitespace-nowrap ',
                                            {
                                                'text-green-900 bg-green-500/20': (product.stock > 0),
                                                'text-red-900 bg-red-500/20': (product.stock <= 0),
                                            }
                                        )
                                    }>
                                    <span className="text-center ">{product.stock}</span>
                                </div>
                            </td>
                            <td className="p-4 py-5">
                                <p className="text-center text-md text-black">
                                    {currencyFormat(product.purchasePrice)}
                                </p>
                            </td>
                            <td className="p-4 py-5">
                                <p className="text-center text-md text-black">
                                    {currencyFormat(product.salePrice)}
                                </p>
                            </td>
                            <td className="p-4 py-5">
                                <div
                                    className={
                                        clsx(
                                            'relative grid items-center px-2 py-1 font-sans text-md font-bold  uppercase rounded-md select-none whitespace-nowrap',
                                            {
                                                'text-green-900 bg-green-500/20': product.state,
                                                'text-red-900 bg-red-500/20': !product.state,
                                            }
                                        )
                                    }
                                >
                                    <span className="text-center">{product.state ? 'Activo' : 'Inactivo'}</span>
                                </div>
                            </td>
                            <td className="p-4 py-5">
                                <Link
                                    className="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-slate-900 transition-all hover:bg-slate-900/10 active:bg-slate-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                    type="button"
                                    href={`/admin/productos/${product.slug}`}
                                >
                                    <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                                        <IoPencilSharp className="w-4 h-4" />
                                    </span>
                                </Link>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    )
}
