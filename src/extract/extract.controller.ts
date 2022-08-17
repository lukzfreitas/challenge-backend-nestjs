import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ExtractService } from './extract.service';

@Controller('extract')
export class ExtractController {

    constructor(private extractService: ExtractService) { }

    @UseGuards(JwtAuthGuard)
    @Get('/:year/:month')
    extractByMonth(@Param('year') year: number, @Param('month') month: number): Promise<any> {
        return this.extractService.extract(year, month);
    }
}
