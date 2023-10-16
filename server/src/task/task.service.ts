import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { File } from 'src/file/file.schema';
import { ChangeStatusDto } from './dto/change-status.dto';

import { CreateTaskDto } from './dto/create-task.dto';
import { Task, TaskDocument } from './task.schema';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(Task.name) private taskModel: Model<Task>,
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<TaskDocument> {
    try {
      return await this.taskModel.create(createTaskDto)
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }

  async changeStatus({ status, taskId }: ChangeStatusDto): Promise<Task> {
    try {
      if (!status || !taskId) throw new BadRequestException('"taskId" and "status" is required fields')

      if (status === 'queue' || status === 'dev' || status === 'done') {   
        const task = await this.taskModel.findById(taskId)
        if (!task) throw new NotFoundException(`Task with id "${taskId}" not found!`)

        
        if (task.status === status) throw new BadRequestException(`Cannot change status from "${task.status}" to "${status}". Statuses must be different.`)
        
        // если ставится на "dev", то devTimeAt: Date.now()
        // если ставится с "dev" на любой другой, то devTimeAt: null и devTime: task.devTime + Math.ceil((Date.now() - devTimeAt) / 1000)
        if (status === 'dev') {
          const devTimeAt = Date.now()
          await task.updateOne({
            $set: {
              status,
              devTimeAt,
            }
          })
          task.devTimeAt = devTimeAt
        } else if (task.status === 'dev') {
          const devTime = task.devTime + Math.ceil((Date.now() - task.devTimeAt) / 1000)
          await task.updateOne({
            $set: {
              status,
              devTimeAt: null,
              devTime,
            }
          })
          task.devTimeAt = null
          task.devTime = devTime
        } else {
          await task.updateOne({
            $set: {
              status,
            }
          })
        }

        task.status = status
        
        return task
      } else throw new BadRequestException('Field "status" must be only "queue" | "dev" | "done"')
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }

  async addSubtask({ text, taskId }: { text: string, taskId: Task['_id'] }): Promise<Task> {
    try {
      if (!text || !taskId) throw new BadRequestException('"text" and "taskId" is required fields')

      const task = await this.taskModel.findById(taskId)
      if (!task) throw new NotFoundException(`Task with id ${taskId} not found`)

      const subtask = { 
        id: task.subtasks.length + 1,
        text,
        isCompleted: false,
      }

      await task.updateOne({
        $push: { subtasks: subtask}
      })

      task.subtasks.push(subtask)

      return await task.populate('files')
    } catch (error) {
      throw error
    }
  }

  async toggleSubtask({ subtaskId, taskId }: { subtaskId: number, taskId: Task['_id'] }): Promise<Task> {
    try {
      if (!subtaskId || !taskId) throw new BadRequestException('"subtaskId" and "taskId" is requred fields')

      const task = await this.taskModel.findById(taskId)
      if (!task) throw new NotFoundException(`Task with id ${taskId} not found`)

      const curSubtask = task.subtasks.find(task => task.id === subtaskId)

      const newIsCompleted = curSubtask.isCompleted ? false : true

      // await task.updateOne(
      //   { 'subtasks.id': subtaskId },
      //   { 
      //     $set: {
      //     'subtasks.$.isCompleted': newIsCompleted,
      //     }
      //   }
      // )

      await this.taskModel.updateOne(
        { _id: taskId, 'subtasks.id': subtaskId },
        { $set:
          { 'subtasks.$.isCompleted': newIsCompleted }
        },
      )

      curSubtask.isCompleted = newIsCompleted

      return await task.populate('files')
    } catch (error) {
      throw error
    }
  }

  async deleteSubtask( taskId: Task['_id'], subtaskId: number): Promise<Task> {
    try {
      if (!subtaskId || !taskId) throw new BadRequestException('"subtaskId" and "taskId" is requred fields')

      const task = await this.taskModel.findById(taskId)
      if (!task) throw new NotFoundException(`Task with id ${taskId} not found`)

      if (!task.subtasks.find(task => task.id === +subtaskId )) throw new NotFoundException(`Task with id ${taskId} has no such subtask with id ${subtaskId}`)

      await task.updateOne(
        { 
          $pull: {
            subtasks: { id: +subtaskId },
          }
        }
      )

      task.subtasks = task.subtasks.filter(task => task.id !== +subtaskId)

      return await task.populate('files')
    } catch (error) {
      throw error
    }
  }

  async delete(taskId: Task['_id']) {
    if (!taskId) throw new BadRequestException('"taskId" is required field')

    const task = await this.taskModel.findById(taskId)

    if (!task) throw new NotFoundException(`Task with id ${taskId} not found`)

    await task.deleteOne()

    return task
  }
}
