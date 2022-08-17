import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { Users } from './users.schema';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) { }
    
    @Post()
    createUser(@Body() user: Users): Promise<any> {
        return this.usersService.createUser(user);
    }
}
