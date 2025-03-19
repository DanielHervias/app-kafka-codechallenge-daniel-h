import { KafkaService } from './kafka.service';
import { TransactionsService } from '../modules/transactions/services/transactions.service';

export class TransactionConsumer {
  private kafkaService = new KafkaService();
  private transactionsService = new TransactionsService();

  async startListening() {
    await this.kafkaService.connectConsumer(
      'transaction_status',
      async (message) => {
        // Se espera un mensaje con { transactionId, status }
        const { transactionId, status } = message;
        await this.transactionsService.updateTransactionStatus(
          transactionId,
          status,
        );
      },
    );
  }
}
