import { Task } from "../task.schema";
export declare class ChangeStatusDto {
    taskId: Task['_id'];
    status: 'queue' | 'dev' | 'done';
}
