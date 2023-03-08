import {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
  Injectable,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private logger = new Logger(LoggingInterceptor.name);

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest<Request>();
    const invokedController = context.getClass().name;
    const invokedService = context.getHandler().name;
    const userAgent = request.get('user-agent');
    const { ip, method, path } = request;

    this.logger.debug(
      `${method} ${path} ${userAgent} ${ip}: ${invokedController} ${invokedService} invoked...`,
    );

    const timeBeforeControllerInvoke = Date.now();

    return next.handle().pipe(
      tap((response) => {
        const httpResponse = context.switchToHttp().getResponse<Response>();
        const { statusCode } = httpResponse;
        const contentLength = httpResponse.get('content-length');

        this.logger.debug(
          `${method} ${path} ${statusCode} ${contentLength} - ${userAgent} ${ip} ${
            Date.now() - timeBeforeControllerInvoke
          }ms`,
        );
        this.logger.debug('Response obj: ', response);
      }),
    );
  }
}
