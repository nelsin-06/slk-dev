import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface ApiResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
  timestamp: string;
  path: string;
}

@Injectable()
export class ResponseInterceptor<T>
  implements NestInterceptor<T, ApiResponse<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ApiResponse<T>> {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    return next.handle().pipe(
      map((data) => ({
        success: true,
        statusCode: response.statusCode,
        message: this.getSuccessMessage(request.method),
        data,
        timestamp: new Date().toISOString(),
        path: request.url,
      })),
    );
  }

  private getSuccessMessage(method: string): string {
    const messages = {
      GET: 'Data retrieved successfully',
      POST: 'Resource created successfully',
      PATCH: 'Resource updated successfully',
      DELETE: 'Resource deleted successfully',
      PUT: 'Resource updated successfully',
    };
    return messages[method] || 'Operation completed successfully';
  }
}
