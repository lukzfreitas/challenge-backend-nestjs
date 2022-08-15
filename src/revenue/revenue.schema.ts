import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { MoneyModel } from "src/models/money.model";

export type RevenueDocument = Revenue & Document

@Schema()
export class Revenue {

    @Prop({ required: true })
    description: String;

    @Prop({ type: MoneyModel, required: true })
    money: String;

    @Prop({ type: Date, required: true })
    date: Date;
}

export const RevenueSchema = SchemaFactory.createForClass(Revenue);