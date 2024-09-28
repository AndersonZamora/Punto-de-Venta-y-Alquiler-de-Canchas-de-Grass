import { IoBaseballSharp } from 'react-icons/io5';
import { TitleAdmin } from '@/components';
import { GrassRegisterForm } from './ui/GrassRegisterForm';

export default function RegistroGrasPage() {
  return (
    <div className="px-1 md:px-2 mx-auto fade-in">
      <TitleAdmin title={"Registrar nueva reserva"} linkHref={"/punto/grass"} linkTitle={"Reservas"} icon={<IoBaseballSharp className="w-6 h-6" />} />
      <div className="mt-2 p-4 flex flex-col w-full h-full text-gray-700 bg-white shadow-md rounded-lg bg-clip-border">
        <GrassRegisterForm />
      </div>
    </div>
  );
}
