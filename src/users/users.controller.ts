import { Body, Controller, Post } from '@nestjs/common';
import { Public } from 'src/auth/auth.constant';
import { Users } from './users.schema';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) { }
    
    @Public()
    @Post()
    createUser(@Body() user: Users): Promise<any> {
        return this.usersService.createUser(user);
    }
}
