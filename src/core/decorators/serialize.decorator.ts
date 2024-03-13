import { UseInterceptors } from '@nestjs/common';
import { SerializeInterceptor } from '../interceptors';

interface ClassConstructor {
  new (...args: any[]): any;
}

export function Serialize(dto: ClassConstructor, flag: boolean = false) {
  return UseInterceptors(new SerializeInterceptor(dto, flag));
}

export function SerializeStrict(dto: ClassConstructor) {
  return UseInterceptors(new SerializeInterceptor(dto));
}
