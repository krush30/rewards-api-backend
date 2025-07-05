import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RewardsService } from './rewards.service';
import { RewardsController } from './rewards.controller';
import { Reward, RewardSchema } from './reward.schema';
import { UsersModule } from '../users/users.module';
import { RedemptionsModule } from '../redemptions/redemptions.module'; // ✅ ADD THIS

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Reward.name, schema: RewardSchema }]),
    UsersModule,
    RedemptionsModule, // ✅ REQUIRED TO INJECT RedemptionsService
  ],
  controllers: [RewardsController],
  providers: [RewardsService],
})
export class RewardsModule {}
