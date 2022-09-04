import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IsEmail } from "class-validator";

export type UsersDocument = Users & Document

@Schema()
export class Users {

    @Prop({ required: true, unique: true })
    @IsEmail()
    email: string;

    @Prop({ required: true })
    username: string;

    @Prop({ type: String, required: true })
    password: string;

    @Prop({ type: String })
    refresh_token: string;
}

export const UsersSchema = SchemaFactory.createForClass(Users);