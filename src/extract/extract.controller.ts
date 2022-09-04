import { Controller, Get, Param } from '@nestjs/common';
import { ExtractService } from './extract.service';

@Controller('extract')
export class ExtractController {

    constructor(private extractService: ExtractService) { }

    @Get('/:year/:month')
    extractByMonth(@Param('year') year: number, @Param('month') month: number): Promise<any> {
        return this.extractService.extract(year, month);
    }
}
