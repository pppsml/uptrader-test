import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument, ObjectId } from 'mongoose';

import { Task } from '../task/task.schema'

export type ProjectDocument = HydratedDocument<Project>;

@Schema()
export class Project {
  _id: ObjectId

  @Prop({ index: 1, required: true })
  name: string;

  @Prop({ type: () => [Number], ref: 'Task', default: [] })
  tasks: Task['_id'][];
}

export const ProjectSchema = SchemaFactory.createForClass(Project)