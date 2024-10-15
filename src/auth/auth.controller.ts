import { Body, Controller, HttpCode, HttpStatus, Post, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthLoginDto, AuthRegisterDto } from './auth.dto';
import { Public } from 'src/decorators/public.decorator';
import { ResponseInterceptor } from '../interceptors/response.interceptor';

@Controller('auth')
@UseInterceptors(ResponseInterceptor)
export class AuthController {
	constructor(private authService: AuthService) {}

	@Public()
	@HttpCode(HttpStatus.OK)
	@Post('login')
	login(@Body() dto: AuthLoginDto) {
		return this.authService.login(dto);
	}

	@Public()
	@HttpCode(HttpStatus.OK)
	@Post('register')
	register(@Body() dto: AuthRegisterDto) {
		return this.authService.register(dto);
	}
}
