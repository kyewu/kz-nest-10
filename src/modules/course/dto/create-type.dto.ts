import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateTypeDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  order: number;

  @IsNumber()
  status: number;
}
