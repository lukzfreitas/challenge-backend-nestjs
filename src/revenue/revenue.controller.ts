import { Body, Controller, Get, Post } from '@nestjs/common';
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

    @Get()
    findAll(): Promise<Revenue[]> {
        return this.revenueService.findAll();
    }
}
