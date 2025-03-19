import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TransactionsController } from './modules/transactions/controllers/transactions.controller';
import { TransactionsService } from './modules/transactions/services/transactions.service';
import { KafkaService } from './kafka/kafka.service';

@Module({
  imports: [CqrsModule],
  controllers: [TransactionsController],
  providers: [
    TransactionsService,
    KafkaService, // Se utiliza para los producers y consumers de Kafka
  ],
})
export class AppModule {}
