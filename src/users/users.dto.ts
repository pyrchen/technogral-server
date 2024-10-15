import { OmitType, PickType } from '@nestjs/mapped-types';
import { Genders, UserEntity, UserRoles } from '../core/entities/user.entity';
import { IsDate, IsEmail, IsEnum, IsNumber, IsString, Length } from 'class-validator';

export class UserDto implements Partial<Omit<UserEntity, 'id' | 'updatedAt' | 'createdAt'>> {
	@IsString()
	@Length(4, 32)
	login: string;

	@IsString()
	password: string;

	@IsString()
	nickname: string;

	@IsString()
	avatar: string;

	@IsDate()
	birthday: Date;

	@IsEnum(Genders)
	gender: Genders;

	@IsEnum(UserRoles)
	role: UserRoles;

	@IsEmail()
	email: string;

	@IsNumber()
	likes: number;

	@IsNumber()
	dislikes: number;
}

export class CreateUserDto extends PickType(UserDto, ['email', 'password']) {}

export class UpdateUserDto extends OmitType(UserDto, ['login', 'email']) {}
