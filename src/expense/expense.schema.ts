import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";

export type ExpenseDocument = Expense & Document

@Schema()
export class Expense {

    @Prop(mongoose.Schema.Types.ObjectId)
    _id: String;

    @Prop({ required: true })
    description: String;

    @Prop({ required: true })
    value: String;

    @Prop({ required: true })
    data: String;
}

export const ExpenseSchema = SchemaFactory.createForClass(Expense);