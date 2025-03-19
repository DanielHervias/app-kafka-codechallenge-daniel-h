import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransactionConsumer } from './kafka/transaction.consumer';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.listen(3000);

  const consumer = new TransactionConsumer();
  consumer.startListening();
}
bootstrap();
