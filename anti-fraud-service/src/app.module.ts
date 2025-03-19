import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AntiFraudService } from './modules/anti-fraud/anti-fraud.service';
import { KafkaService } from './kafka/kafka.service';

@Module({
  imports: [CqrsModule],
  providers: [
    AntiFraudService,
    KafkaService, // Se usa para consumir el evento de transacción creada y para publicar el estado validado
  ],
})
export class AppModule {}
