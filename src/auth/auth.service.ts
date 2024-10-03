import { BadRequestException, ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { getPasswordHash } from 'src/utils/password.utils';
import { AuthLoginDto, AuthRegisterDto } from './auth.dto';
import { UserEntity } from 'src/core/entities/user.entity';

@Injectable()
export class AuthService {
	constructor(
		private usersService: UsersService,
		private jwtService: JwtService
	) {}

	async login({ login, password }: AuthLoginDto): Promise<{ access_token: string }> {
		const user = await this.usersService.getByLogin(login);

		const hash = await getPasswordHash(password);
		if (user?.password !== hash) {
			throw new UnauthorizedException();
		}

		return this._getPayload(user);
	}

	async register({ login, email, password }: AuthRegisterDto): Promise<{ access_token: string }> {
		const user = await this.usersService.getByLogin(login);

		if (user) {
			throw new ConflictException();
		}

		const hash = await getPasswordHash(password);

		const newUser = await this.usersService.create({
			login,
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
			...user,
			access_token: this.jwtService.sign(payload),
		};
	}
}
