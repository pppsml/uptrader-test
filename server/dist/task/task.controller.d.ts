/// <reference types="multer" />
import { CreateTaskDto } from './dto/create-task.dto';
import { ChangeStatusDto } from './dto/change-status.dto';
import { TaskService } from './task.service';
import { Task } from './task.schema';
import { ProjectService } from 'src/project/project.service';
import { FileService } from 'src/file/file.service';
export declare class TaskController {
    private taskService;
    private projectService;
    private fileService;
    constructor(taskService: TaskService, projectService: ProjectService, fileService: FileService);
    createTask(files: Express.Multer.File[], createTaskDto: CreateTaskDto): Promise<Task>;
    changeStatus(changeStatusDto: ChangeStatusDto): Promise<Task>;
    addSubtask(addSubtaskDto: {
        text: string;
        taskId: Task['_id'];
    }): Promise<Task>;
    toggleSubtask(toggleSubtaskDto: {
        subtaskId: number;
        taskId: Task['_id'];
    }): Promise<Task>;
    deleteSubtask(taskId: Task['_id'], subtaskId: number): Promise<Task>;
    deleteTask(taskId: Task['_id'], projectId: string): Promise<Task>;
}
