import { IsNotEmpty, IsNumber } from 'class-validator';
import { CreateTagDto } from './create-tag.dto';

export class UpdateTagDto extends CreateTagDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;
}
