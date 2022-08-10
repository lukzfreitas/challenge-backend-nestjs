import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Money } from "src/models/money";

export type RevenueDocument = Revenue & Document

@Schema()
export class Revenue {

    @Prop({ required: true })
    description: String;

    @Prop({ type: Money, required: true })
    money: String;

    @Prop({ type: Date, required: true })
    date: Date;
}

export const RevenueSchema = SchemaFactory.createForClass(Revenue);