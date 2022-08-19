import { Body, Controller, Post } from '@nestjs/common';
import { Public } from 'src/auth/auth.constant';
import { AuthService } from 'src/auth/auth.service';

@Controller('login')
export class LoginController {

    constructor(private authService: AuthService) {}

    @Public()
    @Post()
    async login(@Body() user) {
      return this.authService.login(user);
    }
}
