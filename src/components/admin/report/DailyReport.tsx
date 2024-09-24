'use client';

import { LoadingPage } from "@/components";
import { useEffect, useState } from "react";
import { DailyTabla } from "./DailyTabla";

interface IReportDaily {
  openTime: string;
  id: string;
  openedBy: string;
  closedBy: string | null;
  closeTime: string;
  openingBalance: number;
  closingBalance: number;
  totalSales: number;
  totalRentals: number;
  totalExpenses: number;
  status: boolean;
}

export const DailyReport = () => {


  const [loading, setLoading] = useState(true);
  const [report, setReport] = useState<IReportDaily | null>();

  const handleReport = async () => {

    setLoading(false);
  }

  useEffect(() => {
    handleReport();
  }, [])

  return (
    <div className="overflow-x-auto">
      {
        (loading)
          ? (<LoadingPage />)
          : (
            <>
              {
                (report) ?
                  (<DailyTabla />)
                  : (<h3>Actualmente no hay una caja abierta</h3>)
              }
            </>
          )
      }
    </div>
  )
}
