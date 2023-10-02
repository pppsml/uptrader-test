import { BadRequestException, Body, Controller, Get, InternalServerErrorException, Post } from '@nestjs/common';

import { CreateTaskDto } from './dto/create-task.dto';
import { TaskService } from './task.service';
import { Task } from './task.schema';
import { ProjectService } from 'src/project/project.service';

@Controller('task')
export class TaskController {
  constructor(
    private taskService: TaskService,
    private projectService: ProjectService,
  ) {}

  @Post('create')
  async createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    try {
      if (!createTaskDto.projectId) throw new BadRequestException('Field "projectId" is required field')
      const project = await this.projectService.getOne(createTaskDto.projectId)
  
      const task = await this.taskService.create(createTaskDto)
  
      project.updateOne({
        $push: { tasks: task._id }
      })

      return task
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }
}
