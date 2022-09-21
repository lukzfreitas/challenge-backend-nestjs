import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ContentDuplicateException } from 'src/common/exceptions/content-duplicate.exception';
import { TypeIncome, TypeIncomeDocument } from './type-income.schema';

@Injectable()
export class TypeIncomeService {
    constructor(@InjectModel(TypeIncome.name) private typeIncomeModel: Model<TypeIncomeDocument>) { }

    async create(typeIncome: TypeIncome): Promise<TypeIncome> {
        const typeIncomeFound: TypeIncome = await this.typeIncomeModel.findOne({ description: typeIncome.description });
        if (!!typeIncomeFound) {
            throw new ContentDuplicateException("Type Income already exists");
        } else {
            return new this.typeIncomeModel(typeIncome).save();
        }
    }

    async update(id: string, typeIncome: TypeIncome): Promise<TypeIncome> {
        return this.typeIncomeModel.findOneAndUpdate({ _id: id }, typeIncome, { new: true }).exec();        
    }

    async findAll(): Promise<TypeIncome[]> {
        return this.typeIncomeModel.find().exec();
    }

    async delete(code: Number) {
        return this.typeIncomeModel.deleteOne({ code });
    }
}
