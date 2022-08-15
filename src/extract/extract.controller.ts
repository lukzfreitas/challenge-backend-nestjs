import { Controller, Get, Param } from '@nestjs/common';
import { InternalServerErrorException } from 'src/common/exceptions/internal-server-error.exception';
import { ExtractService } from './extract.service';

@Controller('extract')
export class ExtractController {

    constructor(private extractService: ExtractService) { }

    @Get('/:type/:year/:month')
    extractByMonth(@Param('type') type: string, @Param('year') year: number, @Param('month') month: number): Promise<any> {
        switch (type) {
            case 'revenue':
                return this.extractService.extractRevenueByMonth(year, month);
            case 'expense':
                return this.extractService.extractExpenseByMonth(year, month);
            default:
                throw new InternalServerErrorException('Type not found');
        }        
    }
}
