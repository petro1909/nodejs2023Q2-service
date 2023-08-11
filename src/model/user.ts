import { Transform, Exclude } from 'class-transformer';
import { IsNotEmpty, IsString, ValidateIf } from 'class-validator';

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

  @ValidateIf((_, value) => value !== null)
  @IsString()
  refreshToken?: string | undefined;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  login: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export class UpdatePasswordDto {
  @IsString()
  @IsNotEmpty()
  oldPassword: string;

  @IsString()
  @IsNotEmpty()
  newPassword: string;
}
