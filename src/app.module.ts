import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { utilities as nestWinstonModuleUtilities, WinstonModule } from 'nest-winston';
import { HomeModule } from './modules/home/home.module';
import { CourseModule } from './modules/course/course.module';
import * as winston from 'winston';
import  DailyRotateFile from 'winston-daily-rotate-file';

const isDebug = process.env.NODE_ENV !== 'production';
console.log(process.env,isDebug);

function createDailyRotateTrnsport(level:string, filename: string) {
  return new DailyRotateFile({
    level,
    dirname: 'logs',
    filename: `${filename}-%DATE%.log`,
    datePattern: 'YYYY-MM-DD-HH',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d',
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.simple()
    )
  })
}

@Module({
  imports: [PrismaModule, WinstonModule.forRoot({
    transports: [
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.ms(),
          nestWinstonModuleUtilities.format.nestLike('MyApp', {
            colors: true,
            prettyPrint: true,
          }),
        ),
      }),
      // other transports...
      ...(isDebug ? [] : [
        createDailyRotateTrnsport('warn', 'error'),
        createDailyRotateTrnsport('info', 'app')
      ])
     
    ],
  }), HomeModule, CourseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
