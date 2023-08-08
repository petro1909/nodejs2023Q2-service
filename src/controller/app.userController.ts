import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpException,
  HttpStatus,
  HttpCode,
  ValidationPipe,
  UseInterceptors,
  ClassSerializerInterceptor,
  ParseUUIDPipe,
} from '@nestjs/common';
import { UserService } from '../service/app.userService';
import { CreateUserDto, UpdatePasswordDto, User } from '../model/user';

@Controller('user')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @HttpCode(200)
  async getUsers(): Promise<Array<User>> {
    return await this.userService.getUsers();
  }

  @Get(':id')
  @HttpCode(200)
  async getUser(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string): Promise<User> {
    const user = await this.userService.getUser(id);
    if (!user) {
      throw new HttpException("such user doesn't exist", HttpStatus.NOT_FOUND);
    }
    return user;
  }

  @Post()
  @HttpCode(201)
  async createUser(@Body(ValidationPipe) createUserDto: CreateUserDto): Promise<User> {
    const user = await this.userService.createUser(createUserDto);
    return user;
  }

  @Put(':id')
  @HttpCode(200)
  async updateUserPassword(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body(ValidationPipe) updatePasswordDto: UpdatePasswordDto,
  ): Promise<User> {
    let user: User;
    try {
      user = await this.userService.changeUserPassword(id, updatePasswordDto);
    } catch (err) {
      throw new HttpException('old password is not correct', HttpStatus.FORBIDDEN);
    }
    if (!user) {
      throw new HttpException("such user doesn't exist", HttpStatus.NOT_FOUND);
    }
    return user;
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteUser(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    const user = await this.userService.deleteUser(id);
    if (!user) {
      throw new HttpException("such user doesn't exist", HttpStatus.NOT_FOUND);
    }
  }
}
