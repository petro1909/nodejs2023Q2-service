import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { FileLoggingService } from './app.fileLoggingService';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  private logService: FileLoggingService;
  constructor() {
    this.logService = new FileLoggingService(process.env.LOGS_REQ_PATH || 'logs/req', 'reqlog.log', +process.env.LOG_FILE_MAX_SIZE_MB || 100);
  }
  async use(req: Request, res: Response, next: NextFunction) {
    const reqLogData = {
      url: req.params,
      method: req.method,
      query: req.query,
      body: req.body,
      date: new Date(),
    };

    const resLogData = { statusCode: res.statusCode };
    const logData = {
      request: reqLogData,
      response: resLogData,
    };
    await this.logService.log(JSON.stringify(logData));
    next();
  }
}
const getResponseLog = (res: Response) => {
  const rawResponse = res.write;
  const rawResponseEnd = res.end;
  const chunkBuffers = [];
  res.write = (...chunks) => {
    const resArgs = [];
    for (let i = 0; i < chunks.length; i++) {
      resArgs[i] = chunks[i];
      if (!resArgs[i]) {
        res.once('drain', res.write);
        i--;
      }
    }
    if (resArgs[0]) {
      chunkBuffers.push(Buffer.from(resArgs[0]));
    }
    return rawResponse.apply(res, resArgs);
  };

  res.end = (...chunk) => {
    const resArgs = [];
    for (let i = 0; i < chunk.length; i++) {
      resArgs[i] = chunk[i];
    }
    if (resArgs[0]) {
      chunkBuffers.push(Buffer.from(resArgs[0]));
    }
    const body = Buffer.concat(chunkBuffers).toString('utf8');
    const responseLog = {
      statusCode: res.statusCode,
      body: JSON.parse(body) || body || {},
      headers: res.getHeaders(),
    };
    rawResponseEnd.apply(res, resArgs);
    return responseLog as unknown as Response;
  };
};
