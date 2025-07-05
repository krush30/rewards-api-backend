import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RedemptionsService } from './redemptions.service';
import { RedemptionsController } from './redemptions.controller';
import { Redemption, RedemptionSchema } from './redemption.schema'; // ✅ this path must be correct
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Redemption.name, schema: RedemptionSchema }, // ✅ REGISTER HERE
    ]),
    UsersModule,
  ],
  controllers: [RedemptionsController],
  providers: [RedemptionsService],
  exports: [RedemptionsService], // ✅ Optional: export for use in RewardsService
})
export class RedemptionsModule {}
