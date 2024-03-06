import { OmitType } from '@nestjs/swagger';
import { CreateHomeDto } from './create-home.dto';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateHomeDto extends OmitType(CreateHomeDto, ['title']) {
  @IsNotEmpty()
  @IsNumber()
  id: number;
}
