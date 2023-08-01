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
} from '@nestjs/common';
import { UserService } from '../service/app.userService';
import { CreateUserDto, UpdatePasswordDto, User } from 'src/model/user';
import { RequestParams } from 'src/model/requestParams';

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
  async getUser(@Param(ValidationPipe) requestParams: RequestParams): Promise<User> {
    const user = await this.userService.getUser(requestParams.id);
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
    @Param(ValidationPipe) requestParams: RequestParams,
    @Body(ValidationPipe) updatePasswordDto: UpdatePasswordDto,
  ): Promise<User> {
    let user: User;
    try {
      user = await this.userService.changeUserPassword(requestParams.id, updatePasswordDto);
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
  async deleteUser(@Param(ValidationPipe) requestParams: RequestParams) {
    const user = await this.userService.deleteUser(requestParams.id);
    if (!user) {
      throw new HttpException("such user doesn't exist", HttpStatus.NOT_FOUND);
    }
  }
}
