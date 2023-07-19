import { Controller, Get, Post, Put, Delete, Param, Body, HttpException, HttpStatus, HttpCode } from '@nestjs/common';
import { UserService } from '../service/app.userService';
import { CreateUserDto, UpdatePasswordDto, User } from 'src/type/user';
import { validate } from 'uuid';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUsers(): Array<User> {
    return this.userService.getUsers();
  }

  @Get(':id')
  @HttpCode(200)
  getUser(@Param('id') id: string) {
    if (!validate(id)) {
      throw new HttpException('id is not uuid', HttpStatus.BAD_REQUEST);
    }
    const user = this.userService.getUser(id);
    if (!user) {
      throw new HttpException("such user doesn't exist", HttpStatus.NOT_FOUND);
    }
    return user;
  }

  @Post()
  @HttpCode(201)
  createUser(@Body() createUserDto: CreateUserDto) {
    const user = this.userService.createUser(createUserDto);
    const userClone = Object.assign({}, user);
    delete userClone.password;
    return userClone;
  }

  @Put()
  @HttpCode(200)
  updateUserPassword(@Param('id') id: string, @Body() updatePasswordDto: UpdatePasswordDto) {
    if (!validate(id)) {
      throw new HttpException('id is not uuid', HttpStatus.BAD_REQUEST);
    }
    let user: User;
    try {
      user = this.userService.changeUserPassword(id, updatePasswordDto);
      if (!user) {
        throw new HttpException("such user doesn't exist", HttpStatus.NOT_FOUND);
      }
    } catch (err) {
      throw new HttpException('old password is not correct', HttpStatus.FORBIDDEN);
    }
    return user;
  }

  @Delete(':id')
  @HttpCode(204)
  deleteUser(@Param('id') id: string) {
    if (!validate(id)) {
      throw new HttpException('id is not uuid', HttpStatus.BAD_REQUEST);
    }
    const user = this.userService.deleteUser(id);
    if (!user) {
      throw new HttpException("such user doesn't exist", HttpStatus.NOT_FOUND);
    }
  }
}
