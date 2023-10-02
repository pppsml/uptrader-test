import { Prop, Schema } from "@nestjs/mongoose";
import { ObjectId } from "mongoose";

import { Task } from '../task/task.schema'


@Schema({ timestamps: { createdAt: true, updatedAt: false } })
export class Comment {
  _id: ObjectId;
  
  @Prop({ type: () => Task, ref: 'Task', default: null })
  taskId: Number | null

  @Prop({ type: () => Comment, ref: 'Comment', default: null })
  parentComment: ObjectId | null

  @Prop({ type: () => String, required: true })
  text: string;
  
  @Prop({ type: () => String, required: true })
  author: string;

  createdAt: number;
}