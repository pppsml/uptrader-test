import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';

import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { PopulatedProject, Project } from './project.schema';

@Controller('project')
export class ProjectController {
  constructor(private projectService: ProjectService) {}

  @Post('create')
  async create(@Body() createProjectDto: CreateProjectDto): Promise<Project> {
    return await this.projectService.create(createProjectDto)
  }
  
  @Get('getall')
  async getAll(): Promise<Project[]> {
    return await this.projectService.getAll()
  }
  
  @Get('getone')
  async getOne(@Query() query: { projectId?: string }): Promise<Project> {
    return await this.projectService.getOne(query.projectId)
  }

  @Delete('delete')
  async delete(@Query() query: { projectId?: string }): Promise<PopulatedProject> {
    return await this.projectService.delete(query.projectId)
  }
}
