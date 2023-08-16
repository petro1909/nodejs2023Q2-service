import { ExceptionFilter, Catch, HttpException, ArgumentsHost } from '@nestjs/common';
import { Response, Request } from 'express';
import { CustomLoggerService } from 'src/service/app.loggingService';

@Catch()
export class CustomExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: CustomLoggerService) {}

  async catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status = exception instanceof HttpException ? exception.getStatus() : 500;
    const message = exception instanceof HttpException ? exception.message : 'Internal server error';

    const requserLogData = {
      url: request.url,
      method: request.method,
      query: request.query,
      body: request.body,
    };
    const responseLogData = {
      statusCode: status,
      message: message,
    };
    const errorLogData = {
      request: requserLogData,
      response: responseLogData,
    };
    await this.logger.error(JSON.stringify(errorLogData));

    response.status(status).json(responseLogData);
  }
}
