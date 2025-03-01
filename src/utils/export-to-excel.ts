import { IReportDetail } from '@/interfaces';
import * as XLSX from 'xlsx';

interface Props {
  detailData: IReportDetail;
  title: string;
}

export const exportToExcel = ({ detailData, title }: Props): Promise<void> => {

  return new Promise((resolve) => {
    const workbook = XLSX.utils.book_new();

    const { totalSales, totalRentals, totalExpenses, totalPurchas } = detailData.summary

    const summaryData = [
      { Descripcion: 'Total de ventas', Valor: totalSales },
      { Descripcion: 'Total de alquiler', Valor: totalRentals },
      { Descripcion: 'Total de gastos', Valor: totalExpenses },
      { Descripcion: 'Total de compras', Valor: totalPurchas },
    ];

    const summaryWorksheet = XLSX.utils.json_to_sheet(summaryData);
    XLSX.utils.book_append_sheet(workbook, summaryWorksheet, 'Resumen');

    const gastosWorksheet = XLSX.utils.json_to_sheet(detailData.newExpenses);
    XLSX.utils.book_append_sheet(workbook, gastosWorksheet, 'Gastos');

    const grassWorksheet = XLSX.utils.json_to_sheet(detailData.newRentals);
    XLSX.utils.book_append_sheet(workbook, grassWorksheet, 'Alquiler de Grass');

    const bodegaWorksheet = XLSX.utils.json_to_sheet(detailData.newSales);
    XLSX.utils.book_append_sheet(workbook, bodegaWorksheet, 'Ventas de la bodega');

    const productosWorksheet = XLSX.utils.json_to_sheet(detailData.newProducts);
    XLSX.utils.book_append_sheet(workbook, productosWorksheet, 'Productos vendidos');

    const comprasWorksheet = XLSX.utils.json_to_sheet(detailData.newDocuments);
    XLSX.utils.book_append_sheet(workbook, comprasWorksheet, 'Compras');

    const comprasProductWorksheet = XLSX.utils.json_to_sheet(detailData.newPurchaseProducts);
    XLSX.utils.book_append_sheet(workbook, comprasProductWorksheet, 'Productos comprados');

    XLSX.writeFile(workbook, `${title}.xlsx`);

    resolve();
  })
};
