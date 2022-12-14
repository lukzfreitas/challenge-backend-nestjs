import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Expense, ExpenseDocument } from './expense.schema';

@Injectable()
export class ExpenseService {

    constructor(@InjectModel(Expense.name) private expenseModel: Model<ExpenseDocument>) { }

    async findByMonth(year: number, month: number): Promise<Expense[]> {
        const gteDate = new Date(year, month - 1, 1);
        const ltDate = new Date(year, month, 0);
        return this.expenseModel.find().where({
            date: {
                $gte: gteDate,
                $lte: ltDate
            }
        })
    }

    async findyId(id: string): Promise<Expense> {
        return this.expenseModel.findOne({ _id: id })
    }

    async findAll(query: { description: string }): Promise<Expense[]> {
        if (query.description) {
            return this.expenseModel.find({ description: { $regex: query.description, $options: 'i' } }).exec();
        }
        return this.expenseModel.find().exec();
    }

    async create(revenue: Expense): Promise<Expense> {
        return new this.expenseModel(revenue).save();
    }

    async update(id: string, expense: Expense): Promise<Expense> {
        return this.expenseModel.findOneAndUpdate({ _id: id }, expense, { new: true }).exec();
    }

    async delete(id: string): Promise<void> {
        this.expenseModel.findByIdAndDelete({ _id: id }).exec();
    }

    async checkIsDuplicated(expense: Expense): Promise<boolean> {
        const date = new Date(expense.date);
        const list = await this.expenseModel.find().where({
            description: expense.description,
            date: {
                $gte: new Date(date.getFullYear(), date.getMonth(), 1),
                $lte: new Date(date.getFullYear(), date.getMonth() + 1, 0)
            }
        });
        return list.length > 0;
    }

    async extractExpanseByMonth(year: number, month: number) {
        const gteDate = new Date(year, month - 1, 1);
        const lteDate = new Date(year, month, 0);
        return await this.expenseModel.aggregate([
            { $match: { date: { $gte: gteDate, $lte: lteDate } } },
            {
                $group: {
                    _id: { month: { $month: "$date" }, year: { $year: "$date" } },
                    totalAmount: { $sum: "$money.amount" }
                },
            },
        ]).exec();
    }

    async extractExpanseByCategory(year: number, month: number) {
        const gteDate = new Date(year, month - 1, 1);
        const lteDate = new Date(year, month, 0);
        return await this.expenseModel.aggregate([
            { $match: { date: { $gte: gteDate, $lte: lteDate } } },
            {
                $group: {
                    _id: { category: "$category" },
                    totalAmount: { $sum: "$money.amount" }
                },
            },
        ]).exec();
    }


}
