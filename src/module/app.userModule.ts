import { Module } from '@nestjs/common';
import { UserController } from 'src/controller/app.userController';
import { UserRepository } from 'src/repository/userRepositoty';
import { UserService } from 'src/service/app.userService';

@Module({
  controllers: [UserController],
  providers: [UserService, UserRepository],
})
export class UserModule {}
