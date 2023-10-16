/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { Model } from 'mongoose';
import { ChangeStatusDto } from './dto/change-status.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task, TaskDocument } from './task.schema';
export declare class TaskService {
    private taskModel;
    constructor(taskModel: Model<Task>);
    create(createTaskDto: CreateTaskDto): Promise<TaskDocument>;
    changeStatus({ status, taskId }: ChangeStatusDto): Promise<Task>;
    addSubtask({ text, taskId }: {
        text: string;
        taskId: Task['_id'];
    }): Promise<Task>;
    toggleSubtask({ subtaskId, taskId }: {
        subtaskId: number;
        taskId: Task['_id'];
    }): Promise<Task>;
    deleteSubtask(taskId: Task['_id'], subtaskId: number): Promise<Task>;
    delete(taskId: Task['_id']): Promise<import("mongoose").Document<unknown, {}, Task> & Task & Required<{
        _id: Number;
    }>>;
}
