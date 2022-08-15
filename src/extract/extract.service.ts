import { Injectable } from "@nestjs/common";
import { ExpenseService } from "src/expense/expense.service";

@Injectable()
export class ExtractService {

    constructor(
        private expenseService: ExpenseService
    ) { }

    async extractByMonth() {        
        this.expenseService.sumExpense();
    }
}