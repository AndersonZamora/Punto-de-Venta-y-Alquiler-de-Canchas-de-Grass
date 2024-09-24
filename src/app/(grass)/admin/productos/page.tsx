import { IoLogoDropbox } from 'react-icons/io5';
import { TitleAdmin } from '@/components';
import { SearchProduct } from './ui/SearchProduct';
import { getProducts } from '@/actions';

interface Props {
    searchParams: {
        page?: string,
        search?: string
    }
}

export default async function ProductosPage({ searchParams }: Props) {

    const page = searchParams.page ? parseInt(searchParams.page) : 1;
    const search = searchParams.search || '';

    const { products, totalPages } = await getProducts({ page, search });

    return (
        <div className="px-1 md:px-2 mx-auto fade-in">
            <TitleAdmin title={"Lista de productos"} linkHref={"/admin/productos/registro"} linkTitle={"Registrar nuevo producto"} icon={<IoLogoDropbox className="w-6 h-6" />} />
            <SearchProduct listProducts={products} totalPages={totalPages} />
        </div>
    );
}