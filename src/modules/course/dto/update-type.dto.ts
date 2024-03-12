import { IsNotEmpty, IsNumber } from 'class-validator';
import { CreateTypeDto } from './create-type.dto';

export class UpdateTypeDto extends CreateTypeDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;
}
