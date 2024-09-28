import { IoCube } from 'react-icons/io5';
import { getProductsPunto } from '@/actions';
import { BodegaContainerModal, TitleAdmin } from '@/components';
import { ListSaleBodega } from './ui/ListSaleBodega';
import { ResumenBodega } from './ui/ResumenBodega';

export default async function VentaPage() {

  const { products, totalPages } = await getProductsPunto();

  return (
    <div className="px-0  mx-auto fade-in">
      <TitleAdmin title={"Realizar venta"} linkHref={"/punto/ventas"} linkTitle={"Ir a ventas"} icon={<IoCube className="w-6 h-6" />} />
      <BodegaContainerModal products={products} totalPages={totalPages} />
      <div className="flex lg:flex-row flex-col-reverse shadow-lg">
        <div className="w-full lg:w-3/5 min-h-screen shadow-lg">
          <div className="px-1 mr-0 md:mr-2 py-4 mt-5 overflow-x-hidden h-auto md:overflow-y-auto md:h-96">
            <ListSaleBodega />
          </div>
        </div>
        <ResumenBodega />
      </div>
    </div>
  );
}
