import { File } from '../../file';
import { Comment } from '../../comment'

export type PriorityType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10

export interface Subtask {
  id: number;
  text: string;
  isCompleted: boolean
}

export interface Task {
  _id: number;
  title: string;
  description: string;
  createdAt: number; // timestamp

  devTimeAt: number | null; // timestamp dev status, number is enabled, null is disabled
  devTime: number; // number of seconds by dev status is disabled
  completedAt: number | null;
  priority: PriorityType;
  files: File[];
  status: 'queue' | 'dev' | 'done';
  subtasks: Subtask[]
  comments: Comment[]
}