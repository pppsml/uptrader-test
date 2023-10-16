import { Task } from "@/entities/task"

export type TaskColumn = {
  id: string;
  list: Task[];
}

export interface RootTaskColumns {
  [key: string]: TaskColumn
}