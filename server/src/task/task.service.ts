import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './task.schema';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(Task.name) private taskModel: Model<Task>,
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    try {
      return await this.taskModel.create(createTaskDto)
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }
}
