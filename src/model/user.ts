import { Transform, Exclude } from 'class-transformer';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class User {
  id: string;
  login: string;

  @Exclude()
  password: string;

  version: number;
  @Transform(({ value }) => value.getTime())
  createdAt: Date;
  @Transform(({ value }) => value.getTime())
  updatedAt: Date;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
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
