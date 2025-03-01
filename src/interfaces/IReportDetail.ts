import { IReportTotal } from "./IReportTotal";

interface ISale {
    Total: number;
    Fecha: string;
  }
  
  interface IRental {
    Nombre: string;
    DNI: string;
    Celular: string;
    Inicio: string;
    Fin: string;
    Total: number;
    Descripcion: string;
    Usuario: string;
  }
  
  interface IProdu {
    Fecha: string;
    Producto: string;
    Pricio: number;
    Cantidad: number;
    Total: number;
  }
  
  interface IExpense {
    Fecha: string;
    Descripcion: string;
    Monto: number;
  }
  
  interface IDocument {
    Fecha: string;
    Numero: string;
    Total: number
  }

export interface IReportDetail {
    newRentals: IRental[]
    newSales: ISale[]
    newExpenses: IExpense[]
    newProducts: IProdu[]
    newPurchaseProducts: IProdu[]
    newDocuments: IDocument[],
    summary: IReportTotal,
  }