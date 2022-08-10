import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RevenueController } from './revenue.controller';
import { Revenue, RevenueSchema } from './revenue.schema';
import { RevenueService } from './revenue.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Revenue.name, schema: RevenueSchema }])],
  controllers: [RevenueController],
  providers: [RevenueService]
})
export class RevenueModule { }
