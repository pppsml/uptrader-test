import { Task } from '../../task'

export interface Project {
  _id: string;
  name: string;
  tasks: Task['_id'][];
}

export interface ProjectPopulated {
  _id: string;
  name: string;
  tasks: Task[];
}