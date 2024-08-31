import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../database/postgress/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from './users.dto';

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(User)
		private readonly userRepository: Repository<User>
	) {}

	async getAll() {
		return await this.userRepository.find();
	}

	async getById(userId: string) {
		return await this.userRepository.findOneBy({ id: userId });
	}

	async create(userData: CreateUserDto) {
		const newUser = this.userRepository.create(userData);

		return await this.userRepository.save(newUser).catch((e) => {
			if (/(email)[\s\S]+(already exists)/.test(e.detail)) {
				throw new BadRequestException('Account with this email already exists.');
			}
			if (/(logib)[\s\S]+(already exists)/.test(e.detail)) {
				throw new BadRequestException('Account with such a login already exists.');
			}
			throw e;
		});
	}

	async checkWhetherUserExists(userId: string): Promise<boolean> {
		const user = await this.userRepository.findOneBy({ id: userId });
		return !!user;
	}

	async delete(userId: string) {
		return await this.userRepository.delete({ id: userId });
	}

	async update(userId: string, userDto: UpdateUserDto) {
		return await this.userRepository.update({ id: userId }, userDto);
	}
}
