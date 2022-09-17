import { Prop } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { TypeIncome } from "src/type-income/type-income.schema";
import { MoneyModel } from "./money.model";

export abstract class Income {

    @Prop({ required: true })
    description: String;

    @Prop({ type: MoneyModel, required: true })
    money: String;

    @Prop({ type: Date, required: true })
    date: Date;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: TypeIncome.name })
    typeIncome: TypeIncome;
} 