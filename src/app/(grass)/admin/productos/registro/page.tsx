import { IoArrowBack } from 'react-icons/io5';
import { ProductRegisterForm } from './ui/ProductRegisterForm';
import { TitleAdmin } from '@/components';

export default function RegistroPage() {
    return (
        <div className="px-1 md:px-2 mx-auto fade-in">
            <TitleAdmin title={"Registrar nuevo producto"} linkHref={"/admin/productos"} linkTitle={"Regresar a los productos"} icon={<IoArrowBack className="w-6 h-6" />} />
            <div className="mt-2 p-4 flex flex-col w-full h-full text-gray-700 bg-white shadow-md rounded-lg bg-clip-border">
                <ProductRegisterForm />
            </div>
        </div>
    );
}