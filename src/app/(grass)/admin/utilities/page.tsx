import { TitleAdmin } from "@/components";
import { IoAnalyticsOutline } from "react-icons/io5";
import { ContentGrafico } from "./ui/ContentGrafico";
import { getUtilitys } from "@/actions/admin/reports/get-utilitys-all";

interface Props {
  searchParams: {
    search?: string
  }
}

export default async function UtilitiesPage({ searchParams }: Props) {

  const search = searchParams.search || '2024';

  const { utilitys } = await getUtilitys({ search });

  return (
    <div className="px-1 md:px-2 mx-auto fade-in">
      <TitleAdmin title={"Historial de utilidades"} linkHref={"/admin/utilities/calc"} linkTitle={"Calcular"} icon={<IoAnalyticsOutline className="w-6 h-6" />} />
      <div className='rounded-md shadow-lg'>
        <div className='w-full flex flex-col items-center'>
          <div className='w-full md:w-4/6'>
            <ContentGrafico utilitys={utilitys} />
          </div>
        </div>
      </div>
    </div>
  );
}