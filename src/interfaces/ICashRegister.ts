import { IExpense } from './IExpense';
import { IRental } from './IRental';
import { ISale } from './ISale';

export interface ICashRegister {
    id: string;
    openedBy: string;
    closedBy: string;
    openTime: string;
    closeTime: string;
    openingBalance: number;
    closingBalance: number;
    totalSales: number;
    totalRentals: number;
    totalExpenses: number;
    status: boolean;
    sales: ISale[];
    rentals: IRental[];
    expenses: IExpense[];
    createdAt: string;
    updatedAt: string;
}
