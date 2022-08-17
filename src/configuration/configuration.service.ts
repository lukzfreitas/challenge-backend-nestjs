import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ConfigurationService {
    private readonly _connectionString!: string;
    private readonly _jwtSecretKey!: string;

    get connectionString(): string {
        return this._connectionString;
    }

    get jwtSecretKey(): string {
        return this._jwtSecretKey
    }

    constructor(private readonly _configService: ConfigService) {
        this._connectionString = this._getConnectionStringFromEnvFile();
        this._jwtSecretKey = this._getJwtSecretKeyFromEnvFile();
    }

    private _getConnectionStringFromEnvFile(): string {
        const connectionString = this._configService.get<string>('MONGODB_DB_URI');
        if (!connectionString) {
            throw new Error('No connection string has been provided in the .env file.');
        }

        return connectionString;
    }

    private _getJwtSecretKeyFromEnvFile(): string {
        const jwtSecretKey = this._configService.get<string>('JWT_SECRECT_KEY');
        if (!jwtSecretKey) {
            throw new Error('No jwt secret key has been provided in the .env file.');
        }

        return jwtSecretKey;
    }
}
