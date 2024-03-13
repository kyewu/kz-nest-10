import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateTypeDto } from './dto/create-type.dto';
import { UpdateTypeDto } from './dto/update-type.dto';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import {
  CreateCourseDto,
  CreateCourseWithTagsInterface,
} from './dto/create-course.dto';
import { CreateCoursesOnTagsDto } from './dto/create-course-tag.dto';

@Injectable()
export class CourseService {
  constructor(private prisma: PrismaService) {}

  //   create course
  createCourse(dto: CreateCourseDto | CreateCourseWithTagsInterface) {
    return this.prisma.courses.create({ data: dto });
  }

  getCourseByType() {
    return this.prisma.courseTypes.findMany({
      include: {
        tags: {
          include: {
            courses: true,
          },
        },
      },
      orderBy: {
        order: 'asc',
      },
    });
  }
  // createCourseWithTags(dto: CreateCourseDto) {
  //   return this.prisma.courses.create({
  //     data: {
  //       ...dto,
  //       tags: {
  //         create: [
  //           {
  //             tagId: 2,
  //           },
  //         ],
  //       },
  //     },
  //   });
  // }

  //   create the relationship between course and tag
  createCoursesOnTags(dto: CreateCoursesOnTagsDto | CreateCoursesOnTagsDto[]) {
    if (dto instanceof Array) {
      return this.prisma.coursesOnTags.createMany({ data: dto });
    }
    return this.prisma.coursesOnTags.create({ data: dto });
  }

  // tag CURD
  createTag(dto: CreateTagDto) {
    return this.prisma.courseTags.create({ data: dto });
  }

  updateTag(dto: UpdateTagDto) {
    return this.prisma.courseTags.update({
      where: {
        id: dto.id,
      },
      data: dto,
    });
  }

  getTag() {
    return this.prisma.courseTags.findMany({
      include: {
        types: true,
      },
    });
  }

  deleteTag(id: number) {
    return this.prisma.courseTags.delete({
      where: {
        id: id,
      },
    });
  }

  // type CURD
  createType(dto: CreateTypeDto) {
    return this.prisma.courseTypes.create({ data: dto });
  }

  updateType(dto: UpdateTypeDto) {
    return this.prisma.courseTypes.update({
      where: {
        id: dto.id,
      },
      data: dto,
    });
  }

  getTypes(id: number) {
    return this.prisma.courseTypes.findMany({
      where: { id },
      include: {
        tags: true,
      },
    });
  }

  deleteType(typeId: number) {
    return this.prisma.courseTypes.delete({
      where: {
        id: typeId,
      },
    });
  }
}
