import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT || 3333, () =>
    console.log('🚀 Server is running in port 3333...'),
  );
}
bootstrap();
