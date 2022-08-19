import { Prop } from "@nestjs/mongoose";
import { MoneyModel } from "./money.model";

export abstract class Income {
    
    @Prop({ required: true })
    description: String;

    @Prop({ type: MoneyModel, required: true })
    money: String;

    @Prop({ type: Date, required: true })
    date: Date;
} 