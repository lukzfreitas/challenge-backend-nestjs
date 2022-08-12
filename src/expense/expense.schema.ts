import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { CategoryEnum } from "src/common/constants/category.enum";
import { Money } from "src/models/money";

export type ExpenseDocument = Expense & Document

@Schema()
export class Expense {

    @Prop({ required: true })
    description: String;

    @Prop({ type: Money, required: true })
    money: String;

    @Prop({ type: Date, required: true })
    date: Date;

    @Prop({ type: Number, required: true })
    category: Number;
}

export const ExpenseSchema = SchemaFactory.createForClass(Expense);