import { IsEmail, IsString } from 'class-validator';
import { UserEntity } from 'src/core/entities/user.entity';

export class AuthLoginDto {
	@IsString()
	login: string;

	@IsString()
	password: string;
}

export class AuthRegisterDto {
	@IsString()
	login: string;

	@IsEmail()
	email: string;

	@IsString()
	password: string;
}

export interface AuthResponse extends UserEntity {
	accessToken: string;
}
