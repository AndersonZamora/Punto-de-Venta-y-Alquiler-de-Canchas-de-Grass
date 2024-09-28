import { getUsers } from '@/actions';
import { TitleAdmin } from '@/components';
import { IoPersonOutline } from 'react-icons/io5';
import { TablaUsuarios } from './ui/TablaUsuarios';

export default async function UsuariosPage() {

  const { users } = await getUsers();

  return (
    <div className="px-1 md:px-2 mx-auto fade-in">
      <TitleAdmin title={"Lista de usuarios"} linkHref={"/admin/usuarios/registro"} linkTitle={"Registrar nuevo usuario"} icon={<IoPersonOutline className="w-4 h-4" />} />
      <div className="relative mt-3 flex flex-col w-full h-full overflow-scroll text-gray-700 bg-white shadow-md rounded-lg bg-clip-border">
        <TablaUsuarios users={users} />
      </div>
    </div>
  );
}
