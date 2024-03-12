import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateCourseDto {
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  subTitle: string;

  @IsString()
  @IsOptional()
  desc: string;

  @IsNumber()
  @IsOptional()
  coverId: number;

  @IsNumber()
  @IsNotEmpty()
  author: number;

  @IsNumber()
  @IsOptional()
  originPrice: number;

  @IsNumber()
  @IsOptional()
  price: number;

  @IsNumber()
  @IsOptional()
  status: number;

  @IsNumber()
  @IsOptional()
  counts: number;

  @IsNumber()
  @IsOptional()
  order: number;

  @IsString()
  @IsOptional()
  detail: string;

  @IsString()
  @IsOptional()
  type: string;

  @IsDate()
  @IsOptional()
  createdAt: string;

  @IsDate()
  @IsOptional()
  updatedAt: string;
}

export interface CreateCourseWithTagsInterface extends CreateCourseDto {
  tags: {
    create: Array<{ tagId: number }>;
  };
}

export class CreateCourseWithTagsDto extends CreateCourseDto {
  @IsOptional()
  @IsNumber({}, { each: true })
  tags: number[];
}
