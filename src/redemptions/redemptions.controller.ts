import { Controller, Get, Query, BadRequestException } from '@nestjs/common';
import { RedemptionsService } from './redemptions.service';

@Controller('redemptions')
export class RedemptionsController {
  constructor(private readonly redemptionsService: RedemptionsService) {}

  // GET /redemptions?userId=...
  @Get()
  async getUserRedemptions(@Query('userId') userId: string) {
    if (!userId) {
      throw new BadRequestException('userId is required');
    }

    const redemptions =
      await this.redemptionsService.getUserRedemptions(userId);

    return {
      userId,
      total: redemptions.length,
      redemptions,
    };
  }
}
