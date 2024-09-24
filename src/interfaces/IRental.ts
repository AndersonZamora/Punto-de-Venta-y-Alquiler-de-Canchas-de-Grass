export interface IRental {
    id: string;
    customerName: string;
    documentDni: string;
    phone: string;
    startTime: Date;
    endTime: Date;
    total: number;
    description: string | null;
    registeredBy: string;
}