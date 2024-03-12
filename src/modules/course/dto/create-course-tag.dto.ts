import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateCoursesOnTagsDto {
  @IsNumber()
  @IsNotEmpty()
  courseId: number;

  @IsNumber()
  @IsNotEmpty()
  tagId: number;
}
