import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TransactionsService } from '../services/transactions.service';
import { CreateTransactionCommand } from '../commands/create-transaction.command';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  async create(
    @Body()
    body: {
      accountExternalIdDebit: string;
      accountExternalIdCredit: string;
      transferTypeId: number;
      value: number;
    },
  ) {
    const command = new CreateTransactionCommand(
      body.accountExternalIdDebit,
      body.accountExternalIdCredit,
      body.transferTypeId,
      body.value,
    );
    return this.transactionsService.createTransaction(command);
  }

  @Get(':transactionExternalId')
  async findOne(@Param('transactionExternalId') transactionExternalId: string) {
    return this.transactionsService.findTransaction(transactionExternalId);
  }
}
