import * as cookieParser from 'cookie-parser';
import { NestFactory, repl } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.use(cookieParser());

	await repl(AppModule);
	await app.listen(3000);
}
bootstrap();
