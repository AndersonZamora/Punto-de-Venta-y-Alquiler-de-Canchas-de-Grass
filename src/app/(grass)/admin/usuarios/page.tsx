import { getUsers } from "@/actions";
import { TitleAdmin } from "@/components";
import { capitalize } from "@/utils";
import Link from "next/link";
import { IoPencilSharp, IoPersonOutline } from "react-icons/io5";
import { TablaUsuarios } from "./ui/TablaUsuarios";

export default async function UsuariosPage() {

  const { users } = await getUsers();

  return (
    <div className="px-1 md:px-2 mx-auto fade-in">
      <TitleAdmin title={"Lista de usuarios"} linkHref={"/admin/usuarios/registro"} linkTitle={"Registrar nuevo usuario"} icon={<IoPersonOutline className="w-4 h-4" />} />
      <div className="relative mt-3 flex flex-col w-full h-full overflow-scroll text-gray-700 bg-white shadow-md rounded-lg bg-clip-border">
        <TablaUsuarios users={users} />
        {/* <table className="w-full text-left table-auto min-w-max">
          <thead>
            <tr>
              <th className="p-4 border-b border-slate-200 bg-slate-50">
                <p className="text-center block font-semibold text-sm  leading-none text-black">
                  Nombre completo
                </p>
              </th>
              <th className="p-4 border-b border-slate-200 bg-slate-50">
                <p className="text-center block font-semibold text-sm  leading-none text-black">
                  Usuario
                </p>
              </th>
              <th className="p-4 border-b border-slate-200 bg-slate-50">
                <p className="text-center text-sm block font-semibold leading-none ttext-black">
                  Rol
                </p>
              </th>
              <th className="p-4 border-b border-slate-200 bg-slate-50">
                <p className="text-center text-sm block font-semibold leading-none ttext-black">
                  Estado
                </p>
              </th>
              <th
                className="p-4 transition-colors cursor-pointer border-y border-slate-200 bg-slate-50 hover:bg-slate-100">
                <p
                  className="flex items-center justify-between gap-2 font-sans text-sm  font-normal leading-none ttext-black">
                </p>
              </th>
            </tr>
          </thead>
          <tbody>
            {
              users.map(data => (
                <tr key={data.id} className="hover:bg-slate-50 border-b border-slate-200">
                  <td className="p-4 py-5">
                    <p className="text-center text-md text-black">
                      {capitalize(data.name)}
                    </p>
                  </td>
                  <td className="p-4 py-5">
                    <p className="text-center text-md text-black">
                      {data.username}
                    </p>
                  </td>
                  <td className="p-4 py-5">
                    <p className="text-center text-xl text-black">
                      {data.role}
                    </p>
                  </td>
                  <td className="p-4 py-5">
                    {
                      data.status ? (
                        <div
                          className="relative grid items-center px-2 py-1 font-sans text-md font-bold text-green-900 uppercase rounded-md select-none whitespace-nowrap bg-green-500/20">
                          <span className="text-center">Activo</span>
                        </div>
                      ) : (
                        <div
                          className="relative grid items-center px-2 py-1 font-sans text-md font-bold text-red-900 uppercase rounded-md select-none whitespace-nowrap bg-red-500/20">
                          <span className="text-center">Inactivo</span>
                        </div>
                      )
                    }

                  </td>
                  <td className="p-4 py-5">
                    <Link
                      className="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-slate-900 transition-all hover:bg-slate-900/10 active:bg-slate-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                      href={`/admin/usuarios/${data.id}`}
                    >
                      <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                        <IoPencilSharp className="w-4 h-4" />
                      </span>
                    </Link>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table> */}
      </div>
    </div>
  );
}
