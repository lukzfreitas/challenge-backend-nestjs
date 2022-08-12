import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ContentDuplicateException } from 'src/common/exceptions/content-duplicate.exception';
import { Revenue } from 'src/revenue/revenue.schema';
import { ExpenseService } from './expense.service';

@Controller('expense')
export class ExpenseController {
    constructor(private expenseService: ExpenseService) { }

    @Post()
    async create(@Body() expense): Promise<void> {
        const exists: boolean = await this.expenseService.checkIsDuplicated(expense);
        if (exists) {
            throw new ContentDuplicateException();
        } else {
            this.expenseService.create(expense);
        }
    }

    @Get()
    findAll(): Promise<Revenue[]> {
        return this.expenseService.findAll();
    }

    @Get(':id')
    findById(@Param('id') id: string): Promise<Revenue> {
        return this.expenseService.findyId(id);
    }

    @Delete(':id')
    delete(@Param() params): Promise<void> {
        return this.expenseService.delete(params.id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() revenue): Promise<Revenue> {
        return this.expenseService.update(id, revenue);
    }
}
