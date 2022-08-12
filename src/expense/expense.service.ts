import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Expense, ExpenseDocument } from './expense.schema';

@Injectable()
export class ExpenseService {

    constructor(@InjectModel(Expense.name) private expenseModel: Model<ExpenseDocument>) { }

    async findyId(id: string): Promise<Expense> {
        return this.expenseModel.findOne({ _id: id })
    }

    async findAll(): Promise<Expense[]> {
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
                $lt: new Date(date.getFullYear(), date.getMonth() + 1, 0)
            }
        });
        return list.length > 0;
    }
}
