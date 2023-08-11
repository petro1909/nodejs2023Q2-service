import { IsString } from 'class-validator';

export class TokenDto {
  @IsString()
  refreshToken: string;
}

export class TokenPayload {
  exp: number;
  iat: number;
  @IsString()
  sub: string;
  @IsString()
  username: string;
}
