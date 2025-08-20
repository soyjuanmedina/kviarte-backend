import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap () {
  const app = await NestFactory.create( AppModule );
  app.useGlobalPipes( new ValidationPipe() );

  app.enableCors( {
    origin: 'http://localhost:4200',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  } );

  // Usar el puerto asignado por Railway, o 3000 como fallback local
  const port = process.env.PORT || 3000;
  await app.listen( port );

  console.log( `Server running on port ${port}` );
}
bootstrap();
