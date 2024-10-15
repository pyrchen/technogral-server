import * as cookieParser from 'cookie-parser';
import { NestFactory, repl } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ILayer } from 'express-serve-static-core';
import { TNullable } from './types/advanced.types';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	const configService: ConfigService = app.get(ConfigService);

	app.use(cookieParser());

	app.useGlobalPipes(
		new ValidationPipe({
			forbidNonWhitelisted: true,
		})
	);

	app.enableCors({
		origin: ['http://localhost:8000', 'https://pyrchen-technogral-client-e0fb.twc1.net'],
		methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
		credentials: true,
	});

	await repl(AppModule);
	await app.listen(configService.get<number>('APP_PORT') || 3000);

	const server = app.getHttpServer();
	const router = server._events.request._router;

	const availableRoutes: [] = router.stack
		.map((layer: ILayer) => {
			if (layer.route) {
				const path = layer.route?.path;
				const method = layer.route?.stack[0].method;
				return `${method.toUpperCase()} ${path}`;
			}
		})
		.filter((item: TNullable<string>) => item !== undefined);

	console.log(availableRoutes);
}

bootstrap();
