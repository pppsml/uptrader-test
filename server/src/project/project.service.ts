import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';

import { Project, ProjectDocument } from './project.schema'
import { CreateProjectDto } from './dto/create-project.dto';

@Injectable()
export class ProjectService {
  constructor(@InjectModel(Project.name) private projectModel: Model<Project>) {}

  async createProject(createProjectDto: CreateProjectDto): Promise<Project> {
    try {
      return await this.projectModel.create(createProjectDto)
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }

  async getAll(): Promise<Project[]> {
    const projects = await this.projectModel.find()

    return projects
  }

  async getOne(projectId: ObjectId): Promise<ProjectDocument> {
    const project = await this.projectModel.findById(projectId)
    if (!project) throw new NotFoundException(`Project with id "${projectId}" does now exist`)

    return await project.populate('tasks')
  }
}
