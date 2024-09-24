import { TitleAdmin } from '@/components';
import { IoPersonOutline } from 'react-icons/io5';
import { UserRegisterForm } from './ui/UserRegisterForm';

export default function RegistroUsuarioPage() {
    return (
        <div className="px-1 md:px-2 mx-auto fade-in">
            <TitleAdmin title={"Lista de usuarios"} linkHref={"/admin/usuarios"} linkTitle={"Regresar a los usuarios"} icon={<IoPersonOutline className="w-4 h-4" />} />

            <div className="mt-2 p-4 flex flex-col w-full h-full text-gray-700 bg-white shadow-md rounded-lg bg-clip-border">
                <UserRegisterForm />
            </div>
        </div>
    );
}