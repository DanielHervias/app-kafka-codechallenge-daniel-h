import { Injectable, Logger } from '@nestjs/common';
import { AntiFraudProducer } from '../../kafka/producers/anti-fraud.producer';

@Injectable()
export class AntiFraudService {
  private readonly logger = new Logger(AntiFraudService.name);
  private readonly antiFraudProducer = new AntiFraudProducer();

  async validateTransaction(transaction: { id: string; value: number }) {
    this.logger.log(`Validando transacción ${transaction.id} con valor ${transaction.value}`);

    // Regla: transacciones con valor > 1000 se rechazan
    const status = transaction.value > 1000 ? 'rejected' : 'approved';

    // Publicamos el resultado de la validación
    await this.antiFraudProducer.sendTransactionStatus({
      transactionId: transaction.id,
      status,
    });

    this.logger.log(`Transacción ${transaction.id} validada: ${status}`);
  }
}
