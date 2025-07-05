import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Transaction, TransactionDocument } from './transaction.schema';
import { CreateTransactionDto } from './create-transaction.dto';
import { UsersService } from '../users/users.service';
import { Reward, RewardDocument } from '../rewards/reward.schema';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectModel(Transaction.name)
    private readonly transactionModel: Model<TransactionDocument>,
    @InjectModel(Reward.name)
    private readonly rewardModel: Model<RewardDocument>,
    private readonly usersService: UsersService,
    @InjectConnection() private readonly connection: Connection,
  ) {}

  // Add a transaction and update reward points
  async createTransaction(dto: CreateTransactionDto): Promise<Transaction> {
    const { userId, amount, category, pointsEarned } = dto;

    await this.usersService.getUserById(userId); // Validate user

    const session = await this.connection.startSession();
    session.startTransaction();

    try {
      const txn = await this.transactionModel.create(
        [{ userId, amount, category, pointsEarned }],
        { session },
      );

      const reward = await this.rewardModel
        .findOne({ userId })
        .session(session);

      if (reward) {
        reward.totalPoints += pointsEarned;
        await reward.save({ session });
      } else {
        await this.rewardModel.create([{ userId, totalPoints: pointsEarned }], {
          session,
        });
      }

      await session.commitTransaction();
      session.endSession();

      return txn[0];
    } catch (err) {
      await session.abortTransaction();
      session.endSession();
      throw err;
    }
  }

  // Get last 5 transactions with pagination
  async getRecentTransactions(userId: string, page = 1, limit = 5) {
    await this.usersService.getUserById(userId); // Validate user

    const skip = (page - 1) * limit;

    const transactions = await this.transactionModel
      .find({ userId })
      .sort({ timestamp: -1 })
      .skip(skip)
      .limit(limit)
      .exec();

    return transactions;
  }
}
