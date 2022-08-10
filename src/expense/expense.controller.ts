import { Body, Controller, Post } from '@nestjs/common';
import { ExpenseService } from './expense.service';

@Controller('expense')
export class ExpenseController {
    constructor(private expenseService: ExpenseService) { }

    @Post()
    async create(@Body() expense): Promise<void> {
        this.expenseService.create(expense);
    }
}
