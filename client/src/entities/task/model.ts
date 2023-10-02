import { Comment } from '../comment'

enum STATUS {
  QUEUE = 'queue',
  DEV = 'dev',
  DONE = 'done',
}


type FileURIType = `${'http' | 'https'}://${string}`
// todo? fix hardcode
type PriorityType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10

interface Subtask {
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
  files: FileURIType[];
  status: STATUS;
  subtasks: Subtask[]
  comments: Comment[]
}