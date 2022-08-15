import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { MoneyModel } from "src/models/money.model";

export type ExpenseDocument = Expense & Document

@Schema()
export class Expense {

    @Prop({ required: true })
    description: String;

    @Prop({ type: MoneyModel, required: true })
    money: String;

    @Prop({ type: Date, required: true })
    date: Date;

    @Prop({ type: Number, required: true })
    category: Number;
}

export const ExpenseSchema = SchemaFactory.createForClass(Expense);