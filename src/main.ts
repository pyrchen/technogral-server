import { NestFactory, repl } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	const configService: ConfigService = app.get(ConfigService);

	await repl(AppModule);
	await app.listen(configService.get<number>('APP_PORT') || 3000);
}

bootstrap();
