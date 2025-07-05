import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Redemption, RedemptionDocument } from './redemption.schema';
import { Model } from 'mongoose';

@Injectable()
export class RedemptionsService {
  constructor(
    @InjectModel(Redemption.name)
    private readonly redemptionModel: Model<RedemptionDocument>,
  ) {}

  // Called from RewardsService after redeeming points
  async recordRedemption(
    userId: string,
    rewardType: string,
    pointsRedeemed: number,
  ): Promise<Redemption> {
    const redemption = new this.redemptionModel({
      userId,
      rewardType,
      pointsRedeemed,
    });

    return redemption.save();
  }

  // Optional: Get all redemptions by a user
  async getUserRedemptions(userId: string): Promise<Redemption[]> {
    return this.redemptionModel.find({ userId }).sort({ timestamp: -1 }).exec();
  }
}
