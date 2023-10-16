import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { AutoIncrementID, AutoIncrementIDOptions } from '@typegoose/auto-increment'
import { HydratedDocument, Types } from "mongoose";

import { File } from "../file/file.schema"


export enum STATUS {
  QUEUE = 'queue',
  DEV = 'dev',
  DONE = 'done',
}

// todo? fix hardcode
export type PriorityType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10


class Subtask {
  @Prop({ type: () => Number, required: true, })
  id: number;

  @Prop({ type: () => String, required: true })
  text: string;

  @Prop({ type: () => Boolean, required: true, default: false })
  isCompleted: boolean;
}

@Schema({ timestamps: { createdAt: true, updatedAt: false },  })
export class Task {
  @Prop({ type: Number, required: true, default: 0 })
  _id: Number;

  @Prop({ required: true })
  title: string;
  
  @Prop({ required: true })
  description: string;
  
  @Prop({ default: null })
  devTimeAt: number | null; // timestamp dev status, number is enabled, null is disabled

  @Prop({ required: true, default: 0 })
  devTime: number; // number of seconds by dev status is disabled

  @Prop({ default: null })
  completedAt: number | null;

  createdAt: Date;

  @Prop({ required: true, default: 5 })
  priority: PriorityType;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'File' }], required: true, default: [] })
  files: File[];

  @Prop({ type: () => String, required: true, default: 'queue' })
  status: 'queue' | 'dev' | 'done';

  @Prop({ required: true, default: [] })
  subtasks: Subtask[]
}

export type TaskDocument = HydratedDocument<Task>;
export const TaskSchema = SchemaFactory.createForClass(Task)

TaskSchema.plugin(AutoIncrementID, { field: '_id' } as AutoIncrementIDOptions)