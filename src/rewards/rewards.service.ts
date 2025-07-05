import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Reward, RewardDocument } from './reward.schema';
import { RedeemDto } from './redeem.dto';
import { UsersService } from '../users/users.service';
import { RedemptionsService } from '../redemptions/redemptions.service';

@Injectable()
export class RewardsService {
  constructor(
    @InjectModel(Reward.name)
    private readonly rewardModel: Model<RewardDocument>,
    private readonly usersService: UsersService,
    private readonly redemptionsService: RedemptionsService, // ✅ inject
  ) {}

  // Get total points for a user
  async getTotalPoints(userId: string): Promise<number> {
    await this.usersService.getUserById(userId); // Validate user

    const reward = await this.rewardModel.findOne({ userId }).exec();
    return reward?.totalPoints ?? 0;
  }

  // Redeem reward points
  async redeemPoints(dto: RedeemDto): Promise<{ success: boolean }> {
    const { userId, pointsToRedeem, rewardType } = dto;

    await this.redemptionsService.recordRedemption(
      userId,
      rewardType,
      pointsToRedeem,
    );

    const reward = await this.rewardModel.findOne({ userId }).exec();

    if (!reward || reward.totalPoints < pointsToRedeem) {
      throw new BadRequestException('Insufficient reward points');
    }

    reward.totalPoints -= pointsToRedeem;
    await reward.save();

    return { success: true };
  }

  // Return available reward options
  getRewardOptions(): string[] {
    return ['cashback', 'voucher', 'gift-card', 'coupon'];
  }
}
