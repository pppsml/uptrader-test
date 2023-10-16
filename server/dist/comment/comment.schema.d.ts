import { ObjectId } from "mongoose";
export declare class Comment {
    _id: ObjectId;
    taskId: Number | null;
    parentComment: ObjectId | null;
    text: string;
    author: string;
    createdAt: number;
}
