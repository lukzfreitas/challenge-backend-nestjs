import { Schema, SchemaFactory } from "@nestjs/mongoose";
import { Income } from "src/models/income.model";

export type RevenueDocument = Revenue & Document

@Schema()
export class Revenue extends Income { }

export const RevenueSchema = SchemaFactory.createForClass(Revenue);