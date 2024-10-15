import {
	Body,
	Controller,
	Delete,
	Get,
	HttpException,
	HttpStatus,
	Param,
	Post,
	UseInterceptors,
	ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ResponseMessageSuccess } from '../decorators/responseMessage.decorator';
import { ResponseInterceptor } from '../interceptors/response.interceptor';
import { CreateUserDto, UpdateUserDto } from './users.dto';
import { Public } from '../decorators/public.decorator';

@Controller('members')
@UseInterceptors(ResponseInterceptor)
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Public()
	@Get('/')
	@ResponseMessageSuccess('Success. Got all users')
	async getAll() {
		return await this.usersService.getAll();
	}

	@Get('/:userId')
	@ResponseMessageSuccess('Success. Got user by ID')
	async getById(@Param('userId') userId: string) {
		const isExisted = await this.usersService.checkWhetherUserExists(userId);

		if (!isExisted) {
			throw new HttpException(
				{
					status: HttpStatus.NOT_FOUND,
					error: 'User does not exist',
				},
				HttpStatus.NOT_FOUND
			);
		}

		return this.usersService.getById(userId);
	}

	@Post('/create')
	@ResponseMessageSuccess('User created successfully')
	async create(@Body(new ValidationPipe()) userDto: CreateUserDto) {
		return this.usersService.create(userDto);
	}

	@Post('/:userId')
	async update(@Param('userId') userId: string, @Body(new ValidationPipe()) userDto: UpdateUserDto) {
		return this.usersService.update(userId, userDto);
	}

	@Delete('/:userId')
	async delete(@Param('userId') userId: string) {
		return this.usersService.delete(userId);
	}
}
