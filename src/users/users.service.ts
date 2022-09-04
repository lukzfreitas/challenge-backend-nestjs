import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Users, UsersDocument } from 'src/users/users.schema';
import * as argon from 'argon2';

@Injectable()
export class UsersService {
    @InjectModel(Users.name) private usersModel: Model<UsersDocument>

    async findOne(username: String): Promise<Users | undefined> {
        return this.usersModel.findOne({ username }).exec();
    }

    async findByEmail(email: String): Promise<Users | undefined> {
        return this.usersModel.findOne({ email }).exec();
    }

    async updateTokens(username: String, refresh_token: String): Promise<void> {
        return this.usersModel.findOneAndUpdate({ username }, { refresh_token })
    }

    async createUser(user: Users) {
        user.password = await argon.hash(user.password);
        return new this.usersModel(user).save();
    }
}
