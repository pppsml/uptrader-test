import { Model } from 'mongoose';
import { PopulatedProject, Project, ProjectDocument } from './project.schema';
import { CreateProjectDto } from './dto/create-project.dto';
export declare class ProjectService {
    private projectModel;
    constructor(projectModel: Model<Project>);
    create(createProjectDto: CreateProjectDto): Promise<Project>;
    getAll(): Promise<Project[]>;
    getOne(projectId: string): Promise<ProjectDocument>;
    delete(projectId: string): Promise<PopulatedProject>;
}
