import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Revenue, RevenueDocument } from './revenue.schema';

@Injectable()
export class RevenueService {

    constructor(@InjectModel(Revenue.name) private revenueModel: Model<RevenueDocument>) { }

    async findyId(id: string): Promise<Revenue> {
        return this.revenueModel.findOne({ _id: id })
    }

    async findAll(query: {description: string}): Promise<Revenue[]> {
        if (query.description) {
            return this.revenueModel.find({ description: { $regex: query.description, $options: 'i' } }).exec();
        }
        return this.revenueModel.find().exec();
    }

    async create(revenue: Revenue): Promise<Revenue> {
        return new this.revenueModel(revenue).save();
    }

    async update(id: string, revenue: Revenue): Promise<Revenue> {
        return this.revenueModel.findOneAndUpdate({ _id: id }, revenue, { new: true }).exec();
    }

    async delete(id: string): Promise<void> {
        this.revenueModel.findByIdAndDelete({ _id: id }).exec();
    }

    async checkIsDuplicated(revenue: Revenue): Promise<boolean> {
        const date: Date = new Date(revenue.date);
        const list = await this.revenueModel.find().where({
            description: revenue.description,
            date: {
                $gte: new Date(date.getFullYear(), date.getMonth(), 1),
                $lte: new Date(date.getFullYear(), date.getMonth() + 1, 0)
            }
        });
        return list.length > 0;
    }

    async findByMonth(year: number, month: number): Promise<Revenue[]> {        
        const gteDate = new Date(year, month - 1, 1);
        const ltDate = new Date(year, month, 0);        
        return this.revenueModel.find().where({
            date:  {
                $gte: gteDate,
                $lte: ltDate
            }
        })
    }
}
