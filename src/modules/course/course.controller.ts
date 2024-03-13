import { Controller, Get, Post, Query, UseInterceptors } from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseWithTagsDto } from './dto/create-course.dto';
import { GetCoursesByTypeDto } from './dto/get-course-type.dto';
import { BigintTransformInterceptor } from '@/core/interceptors';

@Controller('course')
@UseInterceptors(new BigintTransformInterceptor())
export class CourseController {
  constructor(private courseService: CourseService) {}

  @Post()
  async createCourse(dto: CreateCourseWithTagsDto) {
    if (dto.tags && dto.tags.length) {
      const tags = {
        create: dto.tags.map((tagId) => ({ tagId: tagId })),
      };
      return this.courseService.createCourse({ ...dto, tags });
    }
    return this.courseService.createCourse(dto);
  }

  @Get()
  async getCourse(@Query() dto: GetCoursesByTypeDto) {
    console.log(dto);
    return this.courseService.getCourseByType(dto);
  }
}
