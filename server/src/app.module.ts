import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'
import { ConfigModule, ConfigService } from '@nestjs/config'

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProjectModule } from './project/project.module';
import { TaskModule } from './task/task.module';
import { CommentController } from './comment/comment.controller';
import { CommentService } from './comment/comment.service';
import { CommentModule } from './comment/comment.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    ProjectModule,
    TaskModule,
    CommentModule,
  ],
  controllers: [AppController, CommentController],
  providers: [AppService, CommentService],
})
export class AppModule {}
