import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export interface User {
  id: string;
  login: string;
  password: string;
  version: number;
  createdAt: number;
  updatedAt: number;
}

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(255)
  login: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export class UpdatePasswordDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(255)
  oldPassword: string;

  @IsString()
  @IsNotEmpty()
  newPassword: string;
}
