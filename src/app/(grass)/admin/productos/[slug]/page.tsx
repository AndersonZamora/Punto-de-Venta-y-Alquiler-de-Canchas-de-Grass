import { notFound } from 'next/navigation';
import { IoArrowBack } from 'react-icons/io5';
import { TitleAdmin } from '@/components';
import { getProductBySlug } from '@/actions';
import { ProductUpdateForm } from './ui/ProductUpdateForm';

interface Props {
    params: {
        slug: string;
    }
}

export default async function RegistroPage({ params }: Props) {

    const slug = params.slug

    const product = await getProductBySlug(slug)

    if (!product) {
        notFound();
    }

    return (
        <div className="px-1 md:px-2 mx-auto fade-in">
            <TitleAdmin title={"Actualizar  producto"} linkHref={"/admin/productos"} linkTitle={"Regresar a los productos"} icon={<IoArrowBack className="w-4 h-4" />} />
            <div className="mt-2 p-4 flex flex-col w-full h-full text-gray-700 bg-white shadow-md rounded-lg bg-clip-border">
                <ProductUpdateForm product={product} />
            </div>
        </div>
    );
}