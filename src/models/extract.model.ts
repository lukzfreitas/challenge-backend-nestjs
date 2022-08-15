export interface ExtractModel {
    _id: MonthYearExtract;
    totalAmount: number;
    count: number;   
}

interface MonthYearExtract {
    month: number;
    year: number;
} 