import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { Task, TaskSchema } from './task.schema'
import { ProjectModule } from 'src/project/project.module';
import { FileModule } from 'src/file/file.module';

@Module({
  imports: [
    MongooseModule.forFeature([ { name: Task.name, schema: TaskSchema } ]),
    ProjectModule,
    FileModule,
  ],
  controllers: [TaskController],
  providers: [TaskService]
})
export class TaskModule {}
