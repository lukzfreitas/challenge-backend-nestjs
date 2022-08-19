import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Income } from "src/models/income.model";

export type ExpenseDocument = Expense & Document

@Schema()
export class Expense extends Income {    

    @Prop({ type: Number, required: true })
    category: Number;
}

export const ExpenseSchema = SchemaFactory.createForClass(Expense);