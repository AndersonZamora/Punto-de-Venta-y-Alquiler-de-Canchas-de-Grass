import { IoBaseballSharp } from 'react-icons/io5';
import { getRentalPunto } from '@/actions';
import { TitleAdmin } from '@/components';
import { currencyFormat } from '@/utils';
import { ActionsCaja } from '../caja/ui/ActionsCaja';
import { TablaGrass } from './ui/TablaGrass';

export default async function AlquilerPage() {

  const { status, rentals, total, totalPages } = await getRentalPunto();

  return (
    <div className="px-1 md:px-2 mx-auto fade-in">
      {
        (status) ?
          (
            <>
              <TitleAdmin title={`Alquiler del día: ${currencyFormat(total || 0)}`} linkHref={"/punto/grass/registro"} linkTitle={"Registrar nuevo ingreso"} icon={<IoBaseballSharp className="w-6 h-6" />} />
              <div className="p-2 text-center">
                <TablaGrass rentals={rentals || []} totalPages={totalPages || 0} />
              </div>
            </>
          ) : (<ActionsCaja isOpen={status} />)
      }
    </div>
  );
}
