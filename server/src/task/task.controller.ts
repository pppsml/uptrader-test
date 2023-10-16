import { BadRequestException, Body, Controller, Delete, Get, InternalServerErrorException, Patch, Post, Query, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { diskStorage } from 'multer'
import { extname } from 'path'

import { CreateTaskDto } from './dto/create-task.dto';
import { ChangeStatusDto } from './dto/change-status.dto';
import { TaskService } from './task.service';
import { Task } from './task.schema';
import { ProjectService } from 'src/project/project.service';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { FileService } from 'src/file/file.service';
import { File } from 'src/file/file.schema';
import { EditTaskDto } from './dto/edit-task.dto';

@Controller('task')
export class TaskController {
  constructor(
    private taskService: TaskService,
    private projectService: ProjectService,
    private fileService: FileService,
  ) {}

  @Post('create')
  @UseInterceptors(AnyFilesInterceptor({
    storage: diskStorage({
      destination: 'public/files',
      filename: (req, file, cb) => {
        // Generating a 32 random chars long string
        const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
        // Calling the callback passing the random name generated with the original extension name
        cb(null, `${randomName}${extname(file.originalname)}`) 
      }
    })
  }))
  async createTask(
    @UploadedFiles() files: Express.Multer.File[],
    @Body() createTaskDto: CreateTaskDto,
    ): Promise<Task> {
    try {
      if (!createTaskDto.projectId) throw new BadRequestException('Field "projectId" is required field')
      const project = await this.projectService.getOne(createTaskDto.projectId)

      const createdFiles: File[] = []
      for (let i = 0; i < files.length; i++) {
        createdFiles.push(
          await this.fileService.create(files[i])
        )
      }

      const task = await this.taskService.create(createTaskDto)

      await task.updateOne({
        $set: { files: createdFiles.map(file => file._id)}
      })

      await project.updateOne({
        $push: { tasks: task._id }
      })

      return await task.populate('files')
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }

  @Post('changestatus')
  async changeStatus(@Body() changeStatusDto: ChangeStatusDto): Promise<Task> {
    try {
      return await this.taskService.changeStatus(changeStatusDto)
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }

  @Post('addsubtask')
  async addSubtask(@Body() addSubtaskDto: { text: string, taskId: Task['_id'] }): Promise<Task> {
    return await this.taskService.addSubtask(addSubtaskDto)
  }

  @Patch('togglesubtask')
  async toggleSubtask(@Body() toggleSubtaskDto: { subtaskId: number, taskId: Task['_id'] }): Promise<Task> {
    return await this.taskService.toggleSubtask(toggleSubtaskDto)
  }

  @Delete('deletesubtask')
  async deleteSubtask(
    @Query('taskId') taskId: Task['_id'],
    @Query('subtaskId') subtaskId: number,
  ):Promise<Task> {
    return await this.taskService.deleteSubtask(taskId, subtaskId)
  }

  // @Patch('edit')
  // async editTask(editTaskDto: EditTaskDto) {
  //   return await this.taskService.edit(editTaskDto)
  // }

  @Delete('delete')
  async deleteTask(
    @Query('taskId') taskId: Task['_id'],
    @Query('projectId') projectId: string,
    ): Promise<Task> {
    if (!taskId || !projectId) throw new BadRequestException('"taskId" and "projectId" is required fields')
    const task = await this.taskService.delete(taskId)
    
    const project = await this.projectService.getOne(projectId)

    await project.updateOne({
      $pull: {
        tasks: task._id
      }
    })

    return task
  }
}