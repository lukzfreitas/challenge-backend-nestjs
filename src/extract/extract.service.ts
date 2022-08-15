import { Injectable } from "@nestjs/common";
import { ExpenseService } from "src/expense/expense.service";
import { RevenueService } from "src/revenue/revenue.service";

@Injectable()
export class ExtractService {

    constructor(
        private expenseService: ExpenseService,
        private revenueService: RevenueService
    ) { }

    async extractExpenseByMonth(year: number, month: number) {
        return this.expenseService.sumExpense(year, month);
    }

    async extractRevenueByMonth(year: number, month: number) {
        return this.revenueService.sumRevenue(year, month);
    }
}