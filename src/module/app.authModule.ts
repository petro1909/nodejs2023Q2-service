import { Module } from '@nestjs/common';
import { UserModule } from './app.userModule';
import { JwtService } from '@nestjs/jwt';
import { AuthController } from 'src/controller/app.authController';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/middleware/app.authGuard';
import { AuthService } from 'src/service/app.authService';

@Module({
  imports: [UserModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    AuthService,
    JwtService,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
