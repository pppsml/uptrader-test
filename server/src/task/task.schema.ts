import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { AutoIncrementID, AutoIncrementIDOptions } from '@typegoose/auto-increment'


enum STATUS {
  QUEUE = 'queue',
  DEV = 'dev',
  DONE = 'done',
}

type FileURIType = `${'http' | 'https'}://${string}`
// todo? fix hardcode
export type PriorityType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10


class Subtask {
  @Prop({ type: () => String, required: true })
  text: string;

  @Prop({ type: () => Boolean, required: true, default: false })
  isCompleted: string;
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

  createdAd: Date;

  @Prop({ required: true, default: 5 })
  priority: PriorityType;

  @Prop({ required: true, default: [] })
  files: FileURIType[];

  @Prop({ required: true, default: STATUS.QUEUE })
  status: STATUS;

  @Prop({ required: true, default: [] })
  subtasks: Subtask[]
}

export const TaskSchema = SchemaFactory.createForClass(Task)

TaskSchema.plugin(AutoIncrementID, { field: '_id' } as AutoIncrementIDOptions)