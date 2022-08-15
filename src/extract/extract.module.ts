import { Module } from '@nestjs/common';
import { ExpenseModule } from 'src/expense/expense.module';
import { ExtractController } from './extract.controller';
import { ExtractService } from './extract.service';

@Module({
  imports: [ExpenseModule],
  controllers: [ExtractController],
  providers: [ExtractService]  
})
export class ExtractModule { }
