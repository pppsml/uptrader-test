import { ObjectId } from "mongoose";
import { PriorityType,  } from "../task.schema";

export class CreateTaskDto {
  projectId: ObjectId;
  title: string;
  description: string;
  completedAt: number | null;
  priority: PriorityType;
  files: File[];
}