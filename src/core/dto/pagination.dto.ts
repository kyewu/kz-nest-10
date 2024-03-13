import { Type } from 'class-transformer';
import { IsNumber, ValidateNested } from 'class-validator';
import { IsValidValueInArr } from '../decorators/is-valid-value-in-arr.decorator';

class OrderType {
  // because of the dynamic key can't add type validation
  [key: string]: 'asc' | 'desc';
}

export class PaginationDto {
  @IsNumber()
  @Type(() => Number)
  page: number = 1;

  @IsNumber()
  @Type(() => Number)
  size: number = 10;

  @Type(() => OrderType)
  @ValidateNested()
  @IsValidValueInArr(['asc', 'desc'])
  order: OrderType;
}
