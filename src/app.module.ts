import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigurationService } from './configuration/configuration.service';
import { ConfigurationModule } from './configuration/configuration.module';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { RevenueModule } from './revenue/revenue.module';
import { ExpenseModule } from './expense/expense.module';
import { ExtractController } from './extract/extract.controller';
import { ExtractModule } from './extract/extract.module';

@Module({
  imports: [
    RevenueModule,
    ExpenseModule,    
    ExtractModule,
    ConfigurationModule,
    MongooseModule.forRootAsync({
      imports: [ConfigurationModule],
      inject: [ConfigurationService],
      useFactory: (appConfigService: ConfigurationService) => {
        const options: MongooseModuleOptions = {
          uri: appConfigService.connectionString,
          useUnifiedTopology: true,
        };
        return options
      }
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
