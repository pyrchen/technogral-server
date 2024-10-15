import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { comparePasswords, getPasswordHash } from 'src/utils/password.utils';
import { AuthLoginDto, AuthRegisterDto } from './auth.dto';
import { UserEntity } from 'src/core/entities/user.entity';

@Injectable()
export class AuthService {
	constructor(
		private usersService: UsersService,
		private jwtService: JwtService
	) {}

	async login({ email, password }: AuthLoginDto): Promise<{ access_token: string }> {
		const user = await this.usersService.getByEmail(email);

		if (!user) {
			throw new NotFoundException('Пользователя с таким логином или email не найдено');
		}

		const isPasswordValid = await comparePasswords(password, user.password);
		if (!isPasswordValid) {
			throw new BadRequestException('Неверный логин, email или пароль');
		}

		return this._getPayload(user);
	}

	async register({ email, password }: AuthRegisterDto): Promise<{ access_token: string }> {
		const user = await this.usersService.getByEmail(email);

		if (user) {
			throw new ConflictException('Такой пользователь уже существует');
		}

		const hash = await getPasswordHash(password);

		const newUser = await this.usersService.create({
			email,
			password: hash,
		});

		if (!newUser) {
			throw new BadRequestException();
		}

		return this._getPayload(newUser);
	}

	_getPayload(user: UserEntity) {
		const payload = { id: user.id, nickname: user.nickname };

		return {
			user,
			access_token: this.jwtService.sign(payload),
		};
	}
}
