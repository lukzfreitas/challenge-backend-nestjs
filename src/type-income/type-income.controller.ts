import { Body, Controller, Get, Post, Delete, Param, Put } from '@nestjs/common';
import { TypeIncome } from './type-income.schema';
import { TypeIncomeService } from './type-income.service';


@Controller('type-income')
export class TypeIncomeController {

    constructor(private typeIncomeService: TypeIncomeService) { }

    @Post()
    async create(@Body() typeIncome: TypeIncome): Promise<TypeIncome> {
        return await this.typeIncomeService.create(typeIncome);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() typeIncome): Promise<TypeIncome> {
        return this.typeIncomeService.update(id, typeIncome);
    }

    @Get()
    async findAll() {
        return await this.typeIncomeService.findAll();
    }

    @Delete(':id')
    async delete(@Param('id') id: Number) {
        return await this.typeIncomeService.delete(id);
    }
}
