import { notFound } from 'next/navigation';
import { getCompraById } from '@/actions';
import { TitleAdmin } from '@/components';
import { currencyFormat } from '@/utils';
import { IoCartOutline } from 'react-icons/io5';

interface Props {
    params: {
        id: string;
    }
}

export default async function DetailCompraPage({ params }: Props) {

    const id = params.id

    const { purchase } = await getCompraById({ id })

    if (!purchase) {
        notFound();
    }

    return (
        <div className="px-1 md:px-2 mx-auto fade-in">
            <TitleAdmin title={'Detalle de la compra'} linkHref={"/admin/compras"} linkTitle={"Historial de compras"} icon={<IoCartOutline className="w-6 h-6" />} />

            <div className="mt-2">
                <h3 className="text-lg font-semibold text-slate-600">Fecha: <strong>{purchase.purchaseDate}</strong></h3>
                <h3 className="text-lg font-semibold text-slate-600">Total: <strong>{currencyFormat(purchase.total)}</strong></h3>
                <h3 className="text-lg font-semibold text-slate-600">Detalle: <strong>{purchase.documentNumber}</strong></h3>
            </div>

            <div className="relative mt-5 flex flex-col w-full h-full overflow-scroll text-gray-700 bg-white shadow-md rounded-lg bg-clip-border">
                <table className="w-full text-left table-auto min-w-max">
                    <thead>
                        <tr>
                            <th className="p-4 border-b border-slate-200 bg-slate-50">
                                <p className="text-start text-sm block font-semibold leading-none ttext-black">
                                    Producto comprado
                                </p>
                            </th>
                            <th className="p-4 border-b border-slate-200 bg-slate-50">
                                <p className="block text-center font-semibold text-sm leading-none text-black">
                                    Precio de compra
                                </p>
                            </th>
                            <th className="p-4 border-b border-slate-200 bg-slate-50">
                                <p className="text-center text-sm block font-semibold leading-none ttext-black">
                                    Cantidad
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
                            purchase.products.map((purcha) => (
                                <tr key={purcha.id} className="hover:bg-slate-50 border-b border-slate-200">
                                    <td className="p-4 py-5">
                                        <p>{purcha.product.description}</p>
                                    </td>
                                    <td className="p-4 py-5">
                                        <p className="text-center text-md text-black">
                                            {currencyFormat(purcha.costPrice)}
                                        </p>
                                    </td>
                                    <td className="p-4 py-5">
                                        <p className="text-center text-md text-black">
                                            {purcha.quantity}
                                        </p>
                                    </td>
                                    <td className="p-4 py-5">
                                        <p className="text-center text-md text-black">
                                            {currencyFormat(purcha.total)}
                                        </p>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}
