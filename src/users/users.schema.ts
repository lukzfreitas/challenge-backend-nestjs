import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IsEmail } from "class-validator";

export type UsersDocument = Users & Document

@Schema()
export class Users {

    @Prop({ required: true, unique: true })
    @IsEmail()
    email: string;

    @Prop({ required: true })
    username: String;

    @Prop({ type: String, required: true })
    password: String;

    @Prop({ type: String })
    refresh_token: string;
}

export const UsersSchema = SchemaFactory.createForClass(Users);