import { PaginationDto } from '@/core/dto/pagination.dto';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class GetCoursesByTypeDto extends PaginationDto {
  @IsOptional()
  @IsNumber({}, { each: true })
  @Type(() => Number)
  types: number[];
}
