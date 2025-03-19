import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AntiFraudConsumer } from './kafka/anti-fraud.consumer';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.listen(3001);

  const consumer = new AntiFraudConsumer();
  consumer.startListening();
}
bootstrap();
