import { ObjectId } from "mongoose";

export class CreateCommentDto {
  text: string;
  author: string;
  taskId?: number;
  parentComment: ObjectId;
}