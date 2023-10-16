import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { PopulatedProject, Project, ProjectDocument } from './project.schema'
import { CreateProjectDto } from './dto/create-project.dto';

@Injectable()
export class ProjectService {
  constructor(@InjectModel(Project.name) private projectModel: Model<Project>) {}

  async create(createProjectDto: CreateProjectDto): Promise<Project> {
    try {
      if (!createProjectDto.name) throw new BadRequestException('"name" field is required')

      return await this.projectModel.create(createProjectDto)
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }

  async getAll(): Promise<Project[]> {
    const projects = await this.projectModel.find()

    return projects
  }

  async getOne(projectId: string): Promise<ProjectDocument> {
    try {      
      if (!projectId) throw new BadRequestException('"projectId" query parameter is required')

      const project = await this.projectModel.findById(projectId)
      if (!project) throw new NotFoundException(`Project with id "${projectId}" does now exist`)
  
      return await (await project.populate('tasks')).populate('tasks.files')
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }

  async delete(projectId: string): Promise<PopulatedProject> {
    try {
      if (!projectId) throw new BadRequestException('"projectId" query parameter is required')

      const project: PopulatedProject = await (await this.projectModel.findByIdAndDelete(projectId)).populate('tasks')

      project.tasks.forEach(async task => await task.deleteOne())

      return project
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }
}
