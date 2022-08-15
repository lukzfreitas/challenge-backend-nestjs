import { Injectable } from "@nestjs/common";
import { ExpenseService } from "src/expense/expense.service";
import { RevenueService } from "src/revenue/revenue.service";

@Injectable()
export class ExtractService {

    constructor(
        private expenseService: ExpenseService,
        private revenueService: RevenueService
    ) { }

    async extract(year: number, month: number) {
        let expenseAggregateByMonth: any = await this.expenseService.extractExpanseByMonth(year, month);
        let expenseAggregateByCategory: any = await this.expenseService.extractExpanseByCategory(year, month);
        let revenueAggregate: any = await this.revenueService.extractRevenue(year, month);
        let totalExpense = 0;
        let totalRevenue = 0;
        if (expenseAggregateByMonth.length > 0) {
            totalExpense = expenseAggregateByMonth[0].totalAmount;
        }
        if (revenueAggregate.length > 0) {
            totalRevenue = revenueAggregate[0].totalAmount;
        }
        const balance = totalRevenue - totalExpense;
        const extract = {
            totalRevenue,
            totalExpense,
            balance,
            expenseAggregateByCategory
        }
        return extract;
    }
}