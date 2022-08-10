import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Expense, ExpenseDocument } from './expense.schema';

@Injectable()
export class ExpenseService {

    constructor(@InjectModel(Expense.name) private expenseModel: Model<ExpenseDocument>) { }

    async findyId(id: string): Promise<Expense> {
        return this.expenseModel.findOne({ id })
    }

    async findAll(): Promise<Expense[]> {
        return this.expenseModel.find().exec();
    }

    async create(revenue: Expense): Promise<Expense> {
        return new this.expenseModel(revenue).save();
    }
}
