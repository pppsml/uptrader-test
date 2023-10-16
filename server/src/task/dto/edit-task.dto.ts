import { PriorityType, Task } from "../task.schema";


export class EditTaskDto {
  taskId: Task['_id'];
  title: string;
  description: string;
  completedAt: number; // timestamp
  priority: PriorityType;
  files: Express.Multer.File;
}