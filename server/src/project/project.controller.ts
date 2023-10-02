import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ObjectId } from 'mongoose';

import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { Project } from './project.schema';

@Controller('project')
export class ProjectController {
  constructor(private projectService: ProjectService) {}

  @Post('create')
  async createProject(@Body() createProjectDto: CreateProjectDto): Promise<Project> {
    return await this.projectService.createProject(createProjectDto)
  }

  @Get('getall')
  async getAll(): Promise<Project[]> {
    return await this.projectService.getAll()
  }

  @Get('/:projectId')
  async getOne(@Param('projectId') projectId: ObjectId): Promise<Project> {
    return await this.projectService.getOne(projectId)
  }
}
