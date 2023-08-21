import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { CustomLoggerService } from 'src/service/app.loggingService';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  constructor(private readonly logger: CustomLoggerService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    res.on('finish', async () => {
      const requestLogData = {
        url: req.url,
        method: req.method,
        query: req.query,
        body: req.body,
      };
      const responseLogData = {
        status: res.statusCode,
      };
      const logData = {
        request: requestLogData,
        response: responseLogData,
      };
      await this.logger.log(JSON.stringify(logData));
    });

    if (next) {
      next();
    }
  }
}
