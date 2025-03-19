import { KafkaService } from './kafka.service';
import { AntiFraudService } from '../modules/anti-fraud/anti-fraud.service';

export class AntiFraudConsumer {
  private kafkaService = new KafkaService();
  private antiFraudService = new AntiFraudService();

  async startListening() {
    await this.kafkaService.connectConsumer(
      'transaction_created',
      async (message) => {
        await this.antiFraudService.validateTransaction(message);
      },
    );
  }
}
