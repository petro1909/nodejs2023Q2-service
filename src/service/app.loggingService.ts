import { Injectable, LoggerService } from '@nestjs/common';
import { FileLoggingService } from './app.fileLoggingService';
import { ConfigService } from '@nestjs/config';
import { LogLevels } from 'src/model/logLevels';

@Injectable()
export class CustomLoggerService implements LoggerService {
  private fileWriter: FileLoggingService;
  private errorFileWriter: FileLoggingService;
  constructor(private readonly configService: ConfigService) {
    this.fileWriter = new FileLoggingService(
      configService.get('LOGS_REQ_PATH') || 'logs/req',
      'reqlog.log',
      +configService.get('LOG_FILE_MAX_SIZE_MB') || 100,
    );

    this.errorFileWriter = new FileLoggingService(
      this.configService.get('LOGS_ERR_PATH') || 'logs/err',
      'errlog.log',
      +this.configService.get('LOG_FILE_MAX_SIZE_MB') || 100,
    );
  }

  async error(message: any, ...optionalParams: any[]): Promise<void> {
    if (!this.logLevelIsEnabled(LogLevels.error)) {
      return;
    }
    const logMessage = this.createLogRecord(message, LogLevels.error, optionalParams);
    await this.errorFileWriter.write(logMessage);
  }

  async warn(message: any, ...optionalParams: any[]): Promise<void> {
    if (!this.logLevelIsEnabled(LogLevels.warn)) {
      return;
    }
    const logMessage = this.createLogRecord(message, LogLevels.warn, optionalParams);
    await this.fileWriter.write(logMessage);
  }

  async log(message: any, ...optionalParams: any[]): Promise<void> {
    if (!this.logLevelIsEnabled(LogLevels.log)) {
      return;
    }
    const logMessage = this.createLogRecord(message, LogLevels.log, optionalParams);
    await this.fileWriter.write(logMessage);
  }

  async debug(message: any, ...optionalParams: any[]): Promise<void> {
    if (!this.logLevelIsEnabled(LogLevels.debug)) {
      return;
    }
    const logMessage = this.createLogRecord(message, LogLevels.debug, optionalParams);
    await this.fileWriter.write(logMessage);
  }

  async verbose(message: any, ...optionalParams: any[]): Promise<void> {
    if (!this.logLevelIsEnabled(LogLevels.verbose)) {
      return;
    }
    const logMessage = this.createLogRecord(message, LogLevels.verbose, optionalParams);
    await this.fileWriter.write(logMessage);
  }

  private createLogRecord(message: any, type: LogLevels, optionalParams: any[]) {
    const currDate = new Date().toLocaleString();
    return `${currDate}\t ${LogLevels[type].toUpperCase()} [${optionalParams}] ${message} `;
  }

  private logLevelIsEnabled(logLevel: LogLevels): boolean {
    const maxLogLevel = +this.configService.get('LOG_LEVEL');
    if (logLevel <= maxLogLevel) {
      return true;
    }
    return false;
  }
}
