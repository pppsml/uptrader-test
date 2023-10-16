import { Task} from "../task.schema";

export class ChangeStatusDto {
  taskId: Task['_id'];
  status: 'queue' | 'dev' | 'done';
}