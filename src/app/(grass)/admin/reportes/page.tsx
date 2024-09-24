import { currentDate } from "@/utils";
import { ContentReport } from "./ui/ContentReport";

export default function ReportesPage() {

  const handleTap = () => {
    
  }

  return (
    <div className="px-0 mx-auto fade-in">
      <div className="px-5 flex flex-col md:flex-row justify-between items-center text-slate-700 rounded-none bg-clip-border">
        <h3 className="text-lg font-semibold text-slate-800">Reporte de ventas </h3>
        <h3 className="text-lg font-semibold text-slate-800">
          {currentDate()}
        </h3>
      </div>
      <ContentReport />
    </div>
  );
}
