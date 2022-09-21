import { Body, Controller, Get, Post, Delete, Param, Put } from '@nestjs/common';
import { ContentDuplicateException } from 'src/common/exceptions/content-duplicate.exception';
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
    async update(@Param('id') id: string, @Body() typeIncome): Promise<TypeIncome> {
        if (await this.typeIncomeService.isCodeExits(id, typeIncome.code)) {
            throw new ContentDuplicateException('Code already exists');
        }
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
