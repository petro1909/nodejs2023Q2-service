import { Controller, Get, Post, Put, Delete, Param, Body, HttpException, HttpStatus, HttpCode, ValidationPipe } from '@nestjs/common';
import { UserService } from '../service/app.userService';
import { CreateUserDto, UpdatePasswordDto, User } from 'src/model/user';
import { RequestParams } from 'src/model/requestParams';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUsers(): Array<User> {
    return this.userService.getUsers();
  }

  @Get(':id')
  @HttpCode(200)
  getUser(@Param(ValidationPipe) requestParams: RequestParams) {
    const user = this.userService.getUser(requestParams.id);
    if (!user) {
      throw new HttpException("such user doesn't exist", HttpStatus.NOT_FOUND);
    }
    return user;
  }

  @Post()
  @HttpCode(201)
  createUser(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    const user = this.userService.createUser(createUserDto);
    const userClone = Object.assign({}, user);
    delete userClone.password;
    return userClone;
  }

  @Put()
  @HttpCode(200)
  updateUserPassword(@Param(ValidationPipe) requestParams: RequestParams, @Body(ValidationPipe) updatePasswordDto: UpdatePasswordDto) {
    let user: User;
    try {
      user = this.userService.changeUserPassword(requestParams.id, updatePasswordDto);
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
  deleteUser(@Param(ValidationPipe) requestParams: RequestParams) {
    const user = this.userService.deleteUser(requestParams.id);
    if (!user) {
      throw new HttpException("such user doesn't exist", HttpStatus.NOT_FOUND);
    }
  }
}
