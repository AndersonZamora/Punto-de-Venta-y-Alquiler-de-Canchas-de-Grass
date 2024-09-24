import { getUserById } from "@/actions";
import { TitleAdmin } from "@/components";
import { notFound } from "next/navigation";
import { IoPersonOutline } from "react-icons/io5";
import { UserUpdateForm } from "./ui/UserUpdateForm";

interface Props {
    params: {
        slug: string;
    }
}

export default async function EditUserPage({ params }: Props) {

    const slug = params.slug

    const user = await getUserById(slug);

    if (!user) {
        notFound();
    }

    return (
        <div className="px-1 md:px-2 mx-auto fade-in">
            <TitleAdmin title={"Editar usuario"} linkHref={"/admin/usuarios"} linkTitle={"Regresar a los usuarios"} icon={<IoPersonOutline className="w-6 h-6" />} />
            <div className="mt-2 p-4 flex flex-col w-full h-full text-gray-700 bg-white shadow-md rounded-lg bg-clip-border">
                <UserUpdateForm user={user} />
            </div>
        </div>
    );
}
