import { Module } from '@nestjs/common';
import { UserController } from 'src/controller/app.userController';
import { UserService } from 'src/service/app.userService';

@Module({
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
