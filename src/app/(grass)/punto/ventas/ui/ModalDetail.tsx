import clsx from 'clsx';
import { IoCloseCircleOutline } from 'react-icons/io5';
import { capitalize, currencyFormat } from '@/utils';

interface Product {
    id: string
    name: string;
    quantity: number;
    price: number;
    total: number;
}

interface Props {
    products: Product[];
    onCloseModalDeatil: () => void;
    openRow: boolean;
}

export const ModalDetail = ({ products, openRow, onCloseModalDeatil }: Props) => {
    return (
        <div className={
            clsx(
                'fade-in px-1 md:px-0 fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50 py-10',
                { 'invisible': !openRow }
            )
        }>
            <div className="max-h-full w-full md:max-w-4xl overflow-y-auto sm:rounded-2xl bg-white">
                <div className="w-full">
                    <header className="flex items-center justify-between p-2 border-b-2 border-gray-400">
                        <h2 className="font-semibold" id="exampleHeader">Detalle de venta</h2>
                        <button
                            onClick={onCloseModalDeatil}
                            className="transition-colors hover:bg-gray-50 focus:ring focus:outline-none p-2 rounded-full"
                        >
                            <IoCloseCircleOutline className='w-6 h-6' />
                        </button>
                    </header>
                    <div className="relative flex flex-col w-full h-full overflow-scroll text-gray-700 bg-white shadow-md rounded-lg bg-clip-border">
                        <table className="w-full text-left table-auto min-w-max">
                            <thead>
                                <tr>
                                    <th className="p-4 border-b border-slate-200 bg-slate-50">
                                        <p className="block text-center font-semibold text-sm leading-none text-black">
                                            Producto
                                        </p>
                                    </th>
                                    <th className="p-4 border-b border-slate-200 bg-slate-50">
                                        <p className="text-center text-sm block font-semibold leading-none ttext-black">
                                            Cantidad
                                        </p>
                                    </th>
                                    <th className="p-4 border-b border-slate-200 bg-slate-50">
                                        <p className="text-center text-sm block font-semibold leading-none ttext-black">
                                            Precio
                                        </p>
                                    </th>
                                    <th className="p-4 border-b border-slate-200 bg-slate-50">
                                        <p className="text-center text-sm block font-semibold leading-none ttext-black">
                                            Total
                                        </p>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    products.map(product => (
                                        <tr key={product.id} className="hover:bg-slate-50 border-b border-slate-200">
                                            <td className="p-4 py-5">
                                                <p className="text-center text-md text-black">
                                                    {capitalize(product.name)}
                                                </p>
                                            </td>
                                            <td className="p-4 py-5">
                                                <p className="text-center text-md text-black">

                                                    {product.quantity}
                                                </p>
                                            </td>
                                            <td className="p-4 py-5">
                                                <p className="text-center text-md text-black">
                                                    {currencyFormat(product.price)}
                                                </p>
                                            </td>
                                            <td className="p-4 py-5">
                                                <p className="text-center text-md text-black">
                                                    {currencyFormat(product.total)}
                                                </p>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
