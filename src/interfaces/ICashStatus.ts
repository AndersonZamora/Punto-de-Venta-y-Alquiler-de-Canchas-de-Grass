export interface ICashStatus {
    id: string;
    openTime: Date;
    closeTime: Date | null;
    openingBalance: number;
    closingBalance: number;
    totalSales: number;
    totalRentals: number;
    totalExpenses: number;
    status: boolean;
}