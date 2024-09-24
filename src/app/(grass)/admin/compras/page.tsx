import { IoCartOutline } from 'react-icons/io5';
import { getCompras } from '@/actions';
import { TitleAdmin } from '@/components';
import { TablaCompra } from './ui/TablaCompra';

interface Props {
    searchParams: {
        page?: string,
        search?: string
    }
}

export default async function ComprasPage({ searchParams }: Props) {

    const page = searchParams.page ? parseInt(searchParams.page) : 1;
    const search = searchParams.search || '';

    const { purchases, totalPages } = await getCompras({ page, search })

    return (
        <div className="px-1 md:px-2 mx-auto fade-in">
            <TitleAdmin title={"Historial de compras"} linkHref={"/admin/compras/registro"} linkTitle={"Registrar compra"} icon={<IoCartOutline className="w-6 h-6" />} />
            <TablaCompra purchases={purchases} totalPages={totalPages} />
        </div>
    );
}
