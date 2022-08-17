import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CategoryEnum } from 'src/common/constants/category.enum';
import { ContentDuplicateException } from 'src/common/exceptions/content-duplicate.exception';
import { Expense } from './expense.schema';
import { ExpenseService } from './expense.service';

@Controller('expense')
export class ExpenseController {
    constructor(private expenseService: ExpenseService) { }

    @UseGuards(JwtAuthGuard)
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

    @UseGuards(JwtAuthGuard)
    @Get()
    findAll(@Query() query): Promise<Expense[]> {
        return this.expenseService.findAll(query);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    findById(@Param('id') id: string): Promise<Expense> {
        return this.expenseService.findyId(id);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/:year/:month')
    findByMonth(@Param('year') year: number, @Param('month') month: number,): Promise<Expense[]> {
        return this.expenseService.findByMonth(year, month);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    delete(@Param() params): Promise<void> {
        return this.expenseService.delete(params.id);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    update(@Param('id') id: string, @Body() revenue): Promise<Expense> {
        return this.expenseService.update(id, revenue);
    }
}
