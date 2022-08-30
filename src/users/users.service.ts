import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Users, UsersDocument } from 'src/users/users.schema';

@Injectable()
export class UsersService {
    @InjectModel(Users.name) private usersModel: Model<UsersDocument>

    async findOne(username: String): Promise<Users | undefined> {
        return this.usersModel.findOne({ username }).exec();
    }

    async findByEmail(email: String): Promise<Users | undefined> {
        return this.usersModel.findOne({ email }).exec();
    }

    async createUser(user: Users) {
        return new this.usersModel(user).save();
    }
}
