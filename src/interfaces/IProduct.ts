export interface IProduct {
    id: string;
    description: string;
    slug:string;
    purchasePrice: number;
    profitMargin: number;
    salePrice: number;
    profit: number;
    stock: number;
    state: boolean;

    createdAt?: string;
    updatedAt?: string;
}
