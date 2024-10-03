import { IsEmail, IsString } from 'class-validator';

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
