import { Injectable } from '@nestjs/common';
import { UserService } from './app.userService';
import { CreateUserDto, User } from 'src/model/user';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { TokenPayload } from 'src/model/token';
import bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  public async signup(createUserDto: CreateUserDto): Promise<User> {
    return await this.userService.createUser(createUserDto);
  }
  public async login(createUserDto: CreateUserDto) {
    try {
      return await this.userService.getUserByLoginAndPassword(createUserDto.login, createUserDto.password);
    } catch (err) {
      throw new Error(err);
    }
  }

  public async setUserTokenPair(user: User) {
    const payload = { sub: user.id, username: user.login };
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>('JWT_SECRET_KEY'),
      expiresIn: this.configService.get<string>('TOKEN_EXPIRE_TIME'),
    });
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>('JWT_SECRET_REFRESH_KEY'),
      expiresIn: this.configService.get<string>('TOKEN_REFRESH_EXPIRE_TIME'),
    });
    const hashedRefreshToken = await bcrypt.hash(refreshToken, +this.configService.get('CRYPT_SALT'));
    await this.userService.setRefreshToken(user.id, hashedRefreshToken);
    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  }
  public async refresh(refreshToken: string) {
    const payload = this.jwtService.decode(refreshToken) as TokenPayload;
    if (!payload) {
      throw new Error('there is no pyload in token');
    }
    const user = await this.userService.getUser(payload.sub);
    if (!user) {
      throw new Error('there is no such user');
    }
    if (!(await bcrypt.compare(refreshToken, user.refreshToken))) {
      throw new Error('invalid token');
    }
    try {
      const secret = this.configService.get('JWT_SECRET_REFRESH_KEY');
      await this.jwtService.verifyAsync(refreshToken, secret);
    } catch (err) {
      throw new Error('Invalid token');
    }
    return user;
  }
}
