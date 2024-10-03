import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';

import { UsersModule } from '../users/users.module';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JWT_CONFIG } from './auth.constants';
import { AuthGuard } from './auth.guard';

@Module({
	imports: [
		UsersModule,
		JwtModule.register({
			global: true,
			secret: JWT_CONFIG.secret,
			signOptions: { expiresIn: JWT_CONFIG.expiresIn },
		}),
	],
	providers: [
		AuthService,
		{
			provide: APP_GUARD,
			useClass: AuthGuard,
		},
	],
	controllers: [AuthController],
})
export class AuthModule {}
