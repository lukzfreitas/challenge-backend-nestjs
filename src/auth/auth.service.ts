import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigurationService } from 'src/configuration/configuration.service';
import { Users } from 'src/users/users.schema';
import { UsersService } from 'src/users/users.service';
import { JwtPayload } from './types/jtw-payload.type';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        private appConfigService: ConfigurationService
    ) { }

    async validateUser(username: string, pass: string): Promise<any> {
        const user: Users = await this.usersService.findOne(username);
        if (user && user.password === pass) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: Users) {
        const userFound: Users = await this.usersService.validUser(user.username, user.password);
        if (!userFound) {
            throw new ForbiddenException("Acccess Denied");
        }
        const tokens = await this.getTokens(userFound);
        await this.usersService.updateTokens(user.username, user.password, tokens.access_token, tokens.refresh_token);
        return tokens;
    }

    async getTokens(user: Users): Promise<any> {
        const jwtPayload: JwtPayload = { username: user.username, email: user.email };
        const [access_token, refresh_token] = await Promise.all([
            this.jwtService.signAsync(jwtPayload, {
                secret: this.appConfigService.accessTokenSecretKey,
                expiresIn: '15m'
            }),
            this.jwtService.signAsync(jwtPayload, {
                secret: this.appConfigService.refreshTokenSecretKey,
                expiresIn: '7d'
            })
        ]);

        return {
            access_token,
            refresh_token
        }
    }

    async refreshTokens(username: string, rt: string): Promise<any> {
        const user = await this.usersService.findOne(username);
        // if (!user || !user.hashedRt) throw new ForbiddenException('Access Denied');
    
        // const rtMatches = await argon.verify(user.hashedRt, rt);
        // if (!rtMatches) throw new ForbiddenException('Access Denied');
    
        // const tokens = await this.getTokens(user.id, user.email);
        // await this.updateRtHash(user.id, tokens.refresh_token);
    
        // return tokens;
      }
}
