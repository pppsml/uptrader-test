import { ObjectId } from "mongoose";
export declare class CreateCommentDto {
    text: string;
    author: string;
    taskId?: number;
    commentId?: ObjectId;
}
