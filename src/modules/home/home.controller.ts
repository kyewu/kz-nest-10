import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { HomeService } from './home.service';
import { UpdateHomeDto } from './update-home.dto';
import { CreateHomeDto } from './create-home.dto';

@Controller('home')
export class HomeController {
  constructor(private readonly homeService: HomeService) {}

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.homeService.delete(id);
  }

  @Get()
  async find(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('size', new DefaultValuePipe(10), ParseIntPipe) size: number,
  ) {
    const [data, total] = await this.homeService.findMany(page, size);
    return {
      data,
      total,
    };
  }

  @Post()
  create(@Body() dto: CreateHomeDto) {
    return this.homeService.create(dto);
  }

  @Put()
  update(@Body() dto: UpdateHomeDto) {
    return this.homeService.update(dto);
  }
}
