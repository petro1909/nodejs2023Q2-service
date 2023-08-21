import { Module } from '@nestjs/common';
import { CustomLoggerService } from '../service/app.loggingService';

@Module({
  providers: [CustomLoggerService],
  exports: [CustomLoggerService],
})
export class LoggerModule {}
