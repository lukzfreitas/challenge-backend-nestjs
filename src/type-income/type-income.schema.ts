import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type TypeIncomeDocument = TypeIncome & Document

@Schema()
export class TypeIncome {

    @Prop({ type: Number, required: true})
    code: Number;

    @Prop({ required: true })
    description: String;
    
}

export const TypeIncomeSchema = SchemaFactory.createForClass(TypeIncome);