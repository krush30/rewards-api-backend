import {
  Controller,
  Get,
  Post,
  Query,
  Body,
  BadRequestException,
} from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './create-transaction.dto';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  // POST /transactions
  @Post()
  async createTransaction(@Body() dto: CreateTransactionDto) {
    const txn = await this.transactionsService.createTransaction(dto);
    return {
      message: 'Transaction recorded and points added',
      transaction: txn,
    };
  }

  // GET /transactions?userId=...&page=1&limit=5
  @Get()
  async getRecentTransactions(
    @Query('userId') userId: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 5,
  ) {
    if (!userId) {
      throw new BadRequestException('userId is required');
    }

    const transactions = await this.transactionsService.getRecentTransactions(
      userId,
      Number(page),
      Number(limit),
    );

    return {
      userId,
      page,
      limit,
      transactions,
    };
  }
}
