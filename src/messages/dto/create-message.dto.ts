import { IsString, IsNotEmpty, IsInt, IsPositive } from 'class-validator';

export class CreateMessageDto {
  @IsString()
  @IsNotEmpty()
  content: string;

  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  userId: number;
}
