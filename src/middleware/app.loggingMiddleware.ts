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

  // logResponse(req: Request, res: Response) {
  //   const reqLogData = {
  //     url: req.url,
  //     method: req.method,
  //     query: req.query,
  //     body: req.body,
  //   };
  //   const logData = {
  //     date: new Date(),
  //     request: reqLogData,
  //     response: res,
  //   };
  //   return new Promise((resolve) => resolve()));
  // }

  // async getResponseLog(req: Request, res: Response) {
  //   const rawResponse = res.write;
  //   const rawResponseEnd = res.end;
  //   const chunkBuffers = [];
  //   res.write = (...chunks) => {
  //     const resArgs = [];
  //     for (let i = 0; i < chunks.length; i++) {
  //       resArgs[i] = chunks[i];
  //       if (!resArgs[i]) {
  //         res.once('drain', res.write);
  //         i--;
  //       }
  //     }
  //     if (resArgs[0]) {
  //       chunkBuffers.push(Buffer.from(resArgs[0]));
  //     }
  //     return rawResponse.apply(res, resArgs);
  //   };
  //   res.end = (...chunk) => {
  //     const resArgs = [];
  //     for (let i = 0; i < chunk.length; i++) {
  //       resArgs[i] = chunk[i];
  //     }
  //     if (resArgs[0]) {
  //       chunkBuffers.push(Buffer.from(resArgs[0]));
  //     }
  //     const body = Buffer.concat(chunkBuffers).toString('utf8');
  //     const resLogData = {
  //       statusCode: res.statusCode,
  //       body: JSON.parse(body) || body || {},
  //       headers: res.getHeaders(),
  //     } as unknown as Response;
  //     this.logResponse(req, resLogData);
  //     rawResponseEnd.apply(res, resArgs);
  //     return resLogData as unknown as Response;
  //   };
  // }
}
