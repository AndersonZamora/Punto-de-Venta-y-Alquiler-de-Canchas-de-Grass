import { IoBaseballSharp, IoCube, IoKeyOutline, IoPodiumOutline, IoPricetagsOutline, IoStorefrontOutline } from 'react-icons/io5';
import { cashStatus } from '@/actions';
import { ItemsCard } from '@/components';
import { currencyFormat } from '@/utils';

export default async function PuntoPage() {

  const { cashRegister } = await cashStatus({ search: '' });

  const isOpe = (cashRegister?.status === true);

  return (
    <div className='fade-in'>
      <h3 className="text-3xl font-medium text-gray-700">Bodega - Caja {isOpe ? 'Abierta' : 'Cerrada'} </h3>
      <div className="mt-4">
        <div className="flex flex-wrap -mx-6">
          <ItemsCard
            bgIcon={`Caja ${isOpe ? 'bg-green-700' : 'bg-red-700'}`}
            icon={<IoCube className='w-8 h-8 text-white' />}
            classNa='mb-6'
            title={`Caja ${isOpe ? 'Abierta' : 'Cerrada'}`}
            quantity={''}
            rederi={'/punto/caja'}
          />
          <ItemsCard
            icon={<IoPricetagsOutline className='w-8 h-8 text-white' />}
            title={'Total de ventas'}
            classNa='mb-6'
            quantity={`${cashRegister?.totalSales ? currencyFormat(cashRegister.totalSales) : '0'}`}
            rederi={'/punto/ventas'}
          />
          <ItemsCard
            icon={<IoKeyOutline className='w-8 h-8 text-white' />}
            title={'Total de alquiler'}
            classNa='mb-6'
            quantity={`${cashRegister?.totalRentals ? currencyFormat(cashRegister.totalRentals) : '0'}`}
            rederi={'/punto/grass'}
          />
          <ItemsCard
            icon={<IoPodiumOutline className='w-8 h-8 text-white' />}
            title={'Total de gastos'}
            classNa='mb-6'
            quantity={`${cashRegister?.totalExpenses ? currencyFormat(cashRegister.totalExpenses) : '0'}`}
            rederi={'/punto'}
          />
          <ItemsCard
            icon={<IoStorefrontOutline className='w-8 h-8 text-white' />}
            title={'Bodega'}
            classNa='mb-6'
            quantity={''}
            rederi={'/punto/bodega'}
          />
          <ItemsCard
            classNa='mb-6'
            title={'Grass'}
            quantity={''}
            rederi={'/punto/grass'}
            icon={<IoBaseballSharp className='w-8 h-8 text-white' />}
          />
        </div>
      </div>
    </div>
  );
}