export interface Comment {
  _id: string;
  taskId: number | null;
  parentComment: string | null;
  text: string;
  author: string;
  createdAt: number; // timestamp
}