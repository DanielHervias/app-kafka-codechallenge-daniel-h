import { KafkaService } from '../kafka.service';

export class TransactionProducer {
  private kafkaService = new KafkaService();

  async sendTransactionCreated(transaction: { id: string; value: number }) {
    await this.kafkaService.connectProducer();
    await this.kafkaService.sendMessage('transaction_created', transaction);
  }
}
