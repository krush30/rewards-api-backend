import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type RedemptionDocument = Redemption & Document;

@Schema({ timestamps: true })
export class Redemption {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ required: true })
  pointsRedeemed: number;

  @Prop({ required: true })
  rewardType: string;

  @Prop({ default: Date.now })
  timestamp: Date;
}

export const RedemptionSchema = SchemaFactory.createForClass(Redemption);
