import {
  Controller,
  Get,
  Post,
  Query,
  Body,
  BadRequestException,
} from '@nestjs/common';
import { RewardsService } from './rewards.service';
import { RedeemDto } from './redeem.dto';
import { validate } from 'class-validator';

@Controller('rewards')
export class RewardsController {
  constructor(private readonly rewardsService: RewardsService) {}

  // GET /rewards/points?userId=xxx
  @Get('points')
  async getUserPoints(@Query('userId') userId: string) {
    if (!userId) {
      throw new BadRequestException('userId is required');
    }

    const points = await this.rewardsService.getTotalPoints(userId);
    return { userId, totalPoints: points };
  }

  // GET /rewards/options
  @Get('options')
  getRewardOptions() {
    const options = this.rewardsService.getRewardOptions();
    return { rewardOptions: options };
  }

  // POST /rewards/redeem
  @Post('redeem')
  async redeem(@Body() redeemDto: RedeemDto) {
    const result = await this.rewardsService.redeemPoints(redeemDto);
    return {
      message: 'Reward redeemed successfully',
      ...result,
    };
  }
}
