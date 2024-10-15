import { IsEmail, IsString } from 'class-validator';
import { UserEntity } from 'src/core/entities/user.entity';

export class AuthLoginDto {
	@IsEmail()
	email: string;

	@IsString()
	password: string;
}

export class AuthRegisterDto {
	@IsEmail()
	email: string;

	@IsString()
	password: string;
}

export interface AuthResponse extends UserEntity {
	accessToken: string;
}
