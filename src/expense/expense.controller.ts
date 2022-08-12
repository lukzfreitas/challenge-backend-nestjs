import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CategoryEnum } from 'src/common/constants/category.enum';
import { ContentDuplicateException } from 'src/common/exceptions/content-duplicate.exception';
import { RequiredException } from 'src/common/exceptions/required.exception';
import { Revenue } from 'src/revenue/revenue.schema';
import { Expense } from './expense.schema';
import { ExpenseService } from './expense.service';

@Controller('expense')
export class ExpenseController {
    constructor(private expenseService: ExpenseService) { }

    @Post()
    async create(@Body() expense: Expense): Promise<void> {
        const exists: boolean = await this.expenseService.checkIsDuplicated(expense);
        if (exists) {
            throw new ContentDuplicateException();
        }        
        if (!expense.category || expense.category > 7 || expense.category < 0) {
            expense.category = CategoryEnum.OTHER;
        }
        this.expenseService.create(expense);        
    }

    @Get()
    findAll(@Query() query): Promise<Revenue[]> {        
        return this.expenseService.findAll(query);
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
