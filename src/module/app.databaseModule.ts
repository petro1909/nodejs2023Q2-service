import { Global, Module } from '@nestjs/common';
import { PrismaService } from '../service/app.prismaService';

@Global()
@Module({
  controllers: [],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class DatabaseModule {}
