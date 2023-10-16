import { PriorityType } from "../task.schema";
export declare class CreateTaskDto {
    projectId: string;
    title: string;
    description: string;
    completedAt: number | null;
    priority: PriorityType;
}
