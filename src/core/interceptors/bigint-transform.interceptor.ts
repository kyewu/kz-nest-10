import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

const serializeBigInt = (data: any) => {
  if (typeof data === 'bigint') {
    return data.toString();
  }

  if (typeof data === 'object' && data !== null) {
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        data[key] = serializeBigInt(data[key]);
      }
    }
  }

  return data;
};

@Injectable()
export class BigintTransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      tap((data) => {
        console.log(data);
      }),
      map((data) => {
        return serializeBigInt(data);
      }),
    );
  }
}
