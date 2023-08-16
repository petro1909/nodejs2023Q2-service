import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  HttpException,
  HttpStatus,
  HttpCode,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { Public } from 'src/middleware/app.publicDecorator';
import { TokenDto } from 'src/model/token';
import { CreateUserDto, User } from 'src/model/user';
import { AuthService } from 'src/service/app.authService';

@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('/signup')
  @HttpCode(201)
  public async signup(@Body(ValidationPipe) createUserDto: CreateUserDto): Promise<User> {
    return await this.authService.signup(createUserDto);
  }
  @Public()
  @Post('/login')
  @HttpCode(200)
  public async login(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    let user: User;
    try {
      user = await this.authService.login(createUserDto);
    } catch (err) {
      if (err instanceof Error) {
        throw new HttpException(err.message, HttpStatus.FORBIDDEN);
      }
    }
    if (!user) {
      throw new HttpException("user with such login doesn't exist", HttpStatus.FORBIDDEN);
    }
    return await this.authService.setUserTokenPair(user);
  }
  @Post('/refresh')
  @HttpCode(200)
  public async refresh(@Body(ValidationPipe) refreshTokenDto: TokenDto) {
    try {
      const user = await this.authService.refresh(refreshTokenDto.refreshToken);
      return await this.authService.setUserTokenPair(user);
    } catch (err) {
      if (err instanceof Error) {
        throw new HttpException(err.message, HttpStatus.FORBIDDEN);
      }
    }
  }
}
