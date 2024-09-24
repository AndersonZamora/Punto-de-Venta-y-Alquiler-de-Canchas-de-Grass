import { ItemsCard } from '@/components';
import { IoBarChart, IoBaseballSharp, IoCartOutline, IoLogoDropbox, IoPersonOutline, IoPricetagsOutline } from 'react-icons/io5';

export default async function AdminPage() {

  return (
    <div className='fade-in'>
      <h3 className="text-3xl font-medium text-gray-700">Dashboard</h3>
      <div className="mt-4">
        <div className="flex flex-wrap -mx-6">
          <ItemsCard
            classNa='mb-6 sm:mt-0'
            title={'Productos'}
            quantity={''}
            icon={<IoLogoDropbox className='w-8 h-8 text-white' />}
            rederi='/admin/productos'
          />
          <ItemsCard
            classNa='mb-6 sm:mt-0'
            title={'Compras'}
            quantity={''}
            icon={<IoCartOutline className='w-8 h-8 text-white' />}
            rederi='/admin/compras'
          />
          <ItemsCard
            classNa='mb-6 sm:mt-0'
            title={'Grass'}
            quantity={''}
            icon={<IoBaseballSharp className='w-8 h-8 text-white' />}
            rederi='/admin/grass'
          />
          <ItemsCard
            classNa='mb-6 sm:mt-0'
            title={'Ventas'}
            quantity={''}
            icon={<IoPricetagsOutline className='w-8 h-8 text-white' />}
            rederi='/admin/ventas'
          />
          <ItemsCard
            classNa='mb-6 sm:mt-0'
            title={'Reportes'}
            quantity={''}
            icon={<IoBarChart className='w-8 h-8 text-white' />}
            rederi='/admin/reportes'
          />
          <ItemsCard
            classNa='mb-6 sm:mt-0'
            title={'Usuarios'}
            quantity={''}
            icon={<IoPersonOutline className='w-8 h-8 text-white' />}
            rederi='/admin/usuarios'
          />
        </div>
      </div>
    </div>
  );
}