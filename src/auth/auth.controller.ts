import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthLoginDto, AuthRegisterDto } from './auth.dto';
import { Public } from 'src/decorators/public.decorator';

@Controller('auth')
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
