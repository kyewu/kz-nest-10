import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateTagDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsOptional()
  typeId: number;

  @IsNumber()
  order: number;

  @IsNumber()
  status: number;
}
