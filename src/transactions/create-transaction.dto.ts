import { IsMongoId, IsString, IsNumber, Min } from 'class-validator';

export class CreateTransactionDto {
  @IsMongoId()
  userId: string;

  @IsNumber()
  @Min(1)
  amount: number;

  @IsString()
  category: string;

  @IsNumber()
  @Min(0)
  pointsEarned: number;
}
