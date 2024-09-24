
import { IoArrowBack } from 'react-icons/io5';
import { ContainerModal, Resumen, TitleAdmin } from '@/components';
import { ListSale } from './ui/ListSale';
import { capitalize, currentDate } from '@/utils';

export default function RegistroCompraPage() {

    return (
        <div className="px-0  mx-auto fade-in">
           
            <TitleAdmin title={`Registrar compra: ${capitalize(currentDate())}`} linkHref={"/admin/compras"} linkTitle={"Regresar al historial de compras"} icon={<IoArrowBack className="w-6 h-6" />} />
            
            <ContainerModal />
            <div className="flex lg:flex-row flex-col-reverse shadow-lg">
                <div className="w-full lg:w-3/5 min-h-screen shadow-lg">
                    <div className="px-1 mr-0 md:mr-2 py-4 mt-5 overflow-x-hidden h-auto md:overflow-y-auto md:h-96">
                        <ListSale />
                    </div>
                </div>
                <Resumen />
            </div>
        </div>
    );
}
