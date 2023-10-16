/// <reference types="multer" />
import { PriorityType, Task } from "../task.schema";
export declare class EditTaskDto {
    taskId: Task['_id'];
    title: string;
    description: string;
    completedAt: number;
    priority: PriorityType;
    files: Express.Multer.File;
}
