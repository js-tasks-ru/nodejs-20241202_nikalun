import { NestInterceptor, ExecutionContext, CallHandler } from "@nestjs/common";
import { map } from "rxjs";

export class ApiVersionInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    const dateStart = Date.now();
    return next.handle().pipe(
        map(data => {
          return {
            ...data,
            apiVersion: '1.0',
            executionTime: `${Date.now() - dateStart}ms`,
          };
        }),
    )
  }
}
