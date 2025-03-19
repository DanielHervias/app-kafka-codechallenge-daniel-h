import { KafkaService } from '../kafka.service';

export class AntiFraudProducer {
  private kafkaService = new KafkaService();

  async sendTransactionStatus(payload: {
    transactionId: string;
    status: string;
  }) {
    await this.kafkaService.connectProducer();
    await this.kafkaService.sendMessage('transaction_status', payload);
  }
}
