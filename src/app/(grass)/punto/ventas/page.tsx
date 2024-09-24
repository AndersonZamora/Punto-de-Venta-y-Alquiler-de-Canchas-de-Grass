import { IoCube } from 'react-icons/io5';
import { getSalesPunto } from '@/actions';
import { TitleAdmin } from '@/components';
import { currencyFormat } from '@/utils';
import { DetailSale } from './ui/DetailSale';
import { ActionsCaja } from '../caja/ui/ActionsCaja';

export default async function VentasPage() {

    const { ventas, total, status } = await getSalesPunto();

    return (
        <div className="px-1 md:px-2 mx-auto fade-in">
            {
                (status) ?
                    (
                        <>
                            <TitleAdmin title={`Ventas del día: ${currencyFormat(total || 0)}`} linkHref={"/punto/caja"} linkTitle={"Ir a caja"} icon={<IoCube className="w-4 h-4" />} />
                            <div className="relative flex flex-col w-full h-full mt-2 text-gray-700 bg-white shadow-md rounded-lg bg-clip-border">
                                <DetailSale sales={ventas || []} />
                            </div>
                        </>
                    ) :
                    (<ActionsCaja isOpen={status} />)
            }
        </div>
    );
} 