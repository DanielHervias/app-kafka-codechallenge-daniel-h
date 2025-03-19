import { Injectable, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateTransactionCommand } from '../commands/create-transaction.command';
import { TransactionProducer } from '../../../kafka/producers/transaction.producer';

@Injectable()
export class TransactionsService {
  private readonly prisma = new PrismaClient();
  private readonly logger = new Logger(TransactionsService.name);
  private readonly transactionProducer = new TransactionProducer();

  async findTransaction(transactionExternalId: string) {
    return this.prisma.transaction.findUnique({
      where: { transactionExternalId },
    });
  }

  async createTransaction(command: CreateTransactionCommand) {
    // Guarda la transacción con estado "pending"
    const transaction = await this.prisma.transaction.create({
      data: {
        accountExternalIdDebit: command.accountExternalIdDebit,
        accountExternalIdCredit: command.accountExternalIdCredit,
        transferTypeId: command.transferTypeId,
        value: command.value,
        status: 'pending',
      },
    });

    this.logger.log(
      `Transacción creada con id ${transaction.transactionExternalId}`,
    );

    // Publica evento a Kafka para que el servicio antifraude la valide
    await this.transactionProducer.sendTransactionCreated({
      id: transaction.transactionExternalId,
      value: transaction.value,
    });

    return transaction;
  }

  async updateTransactionStatus(transactionExternalId: string, status: string) {
    try {
      const updated = await this.prisma.transaction.update({
        where: { transactionExternalId },
        data: { status },
      });
      this.logger.log(
        `Transacción ${transactionExternalId} actualizada a ${status}`,
      );
      return updated;
      
    } catch (error) {
      if (
        error.code === 'P2025' // Código de error de Prisma para "Record not found"
      ) {
        console.warn(
          `No se encontró la transacción con id ${transactionExternalId} para actualizar a ${status}.`
        );
        return null;
      }
      // Si es otro error, se vuelve a lanzar
      throw error;
    }
  }
}
