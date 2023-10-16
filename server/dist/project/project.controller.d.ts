import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { PopulatedProject, Project } from './project.schema';
export declare class ProjectController {
    private projectService;
    constructor(projectService: ProjectService);
    create(createProjectDto: CreateProjectDto): Promise<Project>;
    getAll(): Promise<Project[]>;
    getOne(query: {
        projectId?: string;
    }): Promise<Project>;
    delete(query: {
        projectId?: string;
    }): Promise<PopulatedProject>;
}
