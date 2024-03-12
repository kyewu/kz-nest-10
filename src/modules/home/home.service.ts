import { PrismaService } from '@/prisma/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { HomeResources } from '@prisma/client';
import { CreateHomeDto } from './dto/create-home.dto';
import { UpdateHomeDto } from './dto/update-home.dto';

@Injectable()
export class HomeService {
  constructor(private prisma: PrismaService) {}

  async findMany(
    page: number = 1,
    size: number = 10,
  ): Promise<[HomeResources[], number]> {
    const skip = (page - 1) * size;
    const take = size;
    return await this.prisma.$transaction([
      this.prisma.homeResources.findMany({ skip, take }),
      this.prisma.homeResources.count(),
    ]);
  }

  create(dto: CreateHomeDto) {
    return this.prisma.homeResources.create({ data: dto });
  }

  update(dto: UpdateHomeDto) {
    return this.prisma.homeResources.update({
      where: { id: dto.id },
      data: dto,
    });
  }

  delete(id: number) {
    return this.prisma.homeResources.delete({ where: { id } }).catch((err) => {
      throw new NotFoundException(err.meta ? err.meta?.cause : 'unknown error');
    });
  }
}
