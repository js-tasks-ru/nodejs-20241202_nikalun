import { ArgumentsHost, ExceptionFilter, HttpStatus } from "@nestjs/common";
import { Response } from "express";
import { appendFileSync } from 'fs';

const status = HttpStatus.INTERNAL_SERVER_ERROR;

export class HttpErrorFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const message = exception.message;
    const errorLog = `[.*] ${status} - ${message}\n`

    appendFileSync('errors.log', errorLog);

    response
        .status(status)
        .json({
          statusCode: status,
          timestamp: new Date().toISOString(),
          message,
        });
  }
}
