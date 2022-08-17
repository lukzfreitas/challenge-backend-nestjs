import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type UsersDocument = Users & Document

@Schema()
export class Users {

    @Prop({ required: true })
    username: String;

    @Prop({ type: String, required: true })
    password: String;
}

export const UsersSchema = SchemaFactory.createForClass(Users);