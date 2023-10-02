import { Task } from '../task'

export interface Project {
  _id: string;
  name: string;
  tasks: Task[];
}