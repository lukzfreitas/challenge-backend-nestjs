import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";

export type RevenueDocument = Revenue & Document

@Schema()
export class Revenue {

    @Prop({ required: true })
    description: String;

    @Prop({ required: true })
    value: String;

    @Prop({ type: Date, required: true })
    date: Date;
}

export const RevenueSchema = SchemaFactory.createForClass(Revenue);