import { HttpException, HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { throwError } from 'rxjs';
import { Revenue, RevenueDocument } from './revenue.schema';

@Injectable()
export class RevenueService {

    constructor(@InjectModel(Revenue.name) private revenueModel: Model<RevenueDocument>) { }

    async findyId(id: string): Promise<Revenue> {
        return this.revenueModel.findOne({ id })
    }

    async findAll(): Promise<Revenue[]> {
        return this.revenueModel.find().exec();
    }

    async create(revenue: Revenue): Promise<Revenue> {
        return new this.revenueModel(revenue).save();
    }

    async checkIsDuplicated(revenue: Revenue): Promise<boolean> {
        const date = new Date(revenue.date);
        const list = await this.revenueModel.find().where({
            description: revenue.description,
            date: {
                $gte: new Date(date.getFullYear(), date.getMonth(), 1),
                $lt: new Date(date.getFullYear(), date.getMonth() + 1, 0)
            }
        });
        return list.length > 0;
    }
}
