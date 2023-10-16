import { ObjectId } from "mongoose";
import { PriorityType,  } from "../task.schema";

export class CreateTaskDto {
  projectId: string;
  title: string;
  description: string;
  completedAt: number | null;
  priority: PriorityType;
}