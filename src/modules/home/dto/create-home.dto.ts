import { IsIn, IsNumber, IsOptional, IsString, IsUrl } from 'class-validator';

export class CreateHomeDto {
  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  subTitle: string;

  @IsString()
  @IsUrl()
  @IsOptional()
  url: string;

  @IsString()
  @IsOptional()
  image: string;

  @IsString()
  @IsOptional()
  desc: string;

  @IsString()
  @IsIn(['home', 'study'])
  @IsOptional()
  module: string;

  @IsString()
  @IsIn(['avatar', 'image', 'project'])
  @IsOptional()
  type: string;

  @IsString()
  @IsOptional()
  icon: string;

  @IsNumber()
  @IsOptional()
  order: number;
}
