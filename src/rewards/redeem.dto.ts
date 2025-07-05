import { IsMongoId, IsString, IsNumber, Min } from 'class-validator';

export class RedeemDto {
  @IsMongoId()
  userId: string;

  @IsString()
  rewardType: string; // e.g., cashback, voucher, etc.

  @IsNumber()
  @Min(1)
  pointsToRedeem: number;
}
