// src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { UsersModule } from './users/users.module';
import { RewardsModule } from './rewards/rewards.module';
import { TransactionsModule } from './transactions/transactions.module';
import { RedemptionsModule } from './redemptions/redemptions.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const uri = config.get<string>('MONGO_URI');
        console.log('🧠 Connecting to MongoDB:', uri); // Optional
        return { uri };
      },
    }),

    UsersModule,
    RewardsModule,
    TransactionsModule,
    RedemptionsModule,
  ],
})
export class AppModule {}
