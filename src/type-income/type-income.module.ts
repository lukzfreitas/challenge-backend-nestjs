import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeIncomeController } from './type-income.controller';
import { TypeIncome, TypeIncomeSchema } from './type-income.schema';
import { TypeIncomeService } from './type-income.service';

@Module({
  imports: [MongooseModule.forFeature([{name: TypeIncome.name, schema: TypeIncomeSchema}])],
  controllers: [TypeIncomeController],  
  providers: [TypeIncomeService],
  exports: [TypeIncomeService]
})
export class TypeIncomeModule {}
