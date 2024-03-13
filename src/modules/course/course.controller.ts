import { Controller, Get, Post, Query, UseInterceptors } from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseWithTagsDto } from './dto/create-course.dto';
import { GetCoursesByTypeDto } from './dto/get-course-type.dto';
import { BigintTransformInterceptor } from '@/core/interceptors';
import { PublicGetCoursesDto } from './dto/public-get-courses.dto';
import { Serialize } from '@/core/decorators';

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
  // @UseInterceptors(new SerializeInterceptor(PublicGetCoursesDto, false))
  @Serialize(PublicGetCoursesDto, false)
  async getCourseByType(
    @Query() dto: GetCoursesByTypeDto,
  ): Promise<PublicGetCoursesDto[]> {
    const res = await this.courseService.getCourseByType(dto);
    if (res && res.length) {
      const data = res.map((o) => {
        return {
          id: o.id,
          name: o.name,
          courses: o.tags.reduce((pre, current) => {
            return [...pre, ...current.courses.map((course) => course.course)];
          }, []),
        };
      });
      return data;
    }
    return [];
  }
}
