import {
  IsString,
  IsEmail,
  IsOptional,
  IsNotEmpty,
  IsBoolean,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsBoolean()
  @IsOptional()
  active: boolean = true;
}
