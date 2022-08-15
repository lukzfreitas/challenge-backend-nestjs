import { Module } from '@nestjs/common';
import { ExpenseModule } from 'src/expense/expense.module';
import { RevenueModule } from 'src/revenue/revenue.module';
import { ExtractController } from './extract.controller';
import { ExtractService } from './extract.service';

@Module({
  imports: [ExpenseModule, RevenueModule],
  controllers: [ExtractController],
  providers: [ExtractService]  
})
export class ExtractModule { }
