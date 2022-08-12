import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ContentDuplicateException } from 'src/common/exceptions/content-duplicate.exception';
import { Revenue } from './revenue.schema';
import { RevenueService } from './revenue.service';

@Controller('revenue')
export class RevenueController {

    constructor(private revenueService: RevenueService) { }

    @Post()
    async create(@Body() revenue: Revenue): Promise<void> {
        const exists: boolean = await this.revenueService.checkIsDuplicated(revenue);
        if (exists) {
            throw new ContentDuplicateException();
        } else {
            this.revenueService.create(revenue);
        }
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() revenue): Promise<Revenue> {
        return this.revenueService.update(id, revenue);
    }

    @Get()
    findAll(@Query() query): Promise<Revenue[]> {
        return this.revenueService.findAll(query);
    }

    @Get(':id')
    findById(@Param('id') id: string): Promise<Revenue> {
        return this.revenueService.findyId(id);
    }

    @Get('/:year/:month')
    findByMonth(@Param('year') year: number, @Param('month') month: number,): Promise<Revenue[]> {                
        return this.revenueService.findByMonth(year, month);
    }


    @Delete(':id')
    delete(@Param() params): Promise<void> {
        return this.revenueService.delete(params.id);
    }
}
