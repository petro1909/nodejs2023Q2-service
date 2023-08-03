import { Module } from '@nestjs/common';
import { UserController } from '../controller/app.userController';
import { UserRepository } from '../repository/userRepositoty';
import { UserService } from '../service/app.userService';

@Module({
  controllers: [UserController],
  providers: [UserService, UserRepository],
})
export class UserModule {}
