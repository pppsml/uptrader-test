"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const task_schema_1 = require("./task.schema");
let TaskService = class TaskService {
    constructor(taskModel) {
        this.taskModel = taskModel;
    }
    async create(createTaskDto) {
        try {
            return await this.taskModel.create(createTaskDto);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error.message);
        }
    }
    async changeStatus({ status, taskId }) {
        try {
            if (!status || !taskId)
                throw new common_1.BadRequestException('"taskId" and "status" is required fields');
            if (status === 'queue' || status === 'dev' || status === 'done') {
                const task = await this.taskModel.findById(taskId);
                if (!task)
                    throw new common_1.NotFoundException(`Task with id "${taskId}" not found!`);
                if (task.status === status)
                    throw new common_1.BadRequestException(`Cannot change status from "${task.status}" to "${status}". Statuses must be different.`);
                if (status === 'dev') {
                    const devTimeAt = Date.now();
                    await task.updateOne({
                        $set: {
                            status,
                            devTimeAt,
                        }
                    });
                    task.devTimeAt = devTimeAt;
                }
                else if (task.status === 'dev') {
                    const devTime = task.devTime + Math.ceil((Date.now() - task.devTimeAt) / 1000);
                    await task.updateOne({
                        $set: {
                            status,
                            devTimeAt: null,
                            devTime,
                        }
                    });
                    task.devTimeAt = null;
                    task.devTime = devTime;
                }
                else {
                    await task.updateOne({
                        $set: {
                            status,
                        }
                    });
                }
                task.status = status;
                return task;
            }
            else
                throw new common_1.BadRequestException('Field "status" must be only "queue" | "dev" | "done"');
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error.message);
        }
    }
    async addSubtask({ text, taskId }) {
        try {
            if (!text || !taskId)
                throw new common_1.BadRequestException('"text" and "taskId" is required fields');
            const task = await this.taskModel.findById(taskId);
            if (!task)
                throw new common_1.NotFoundException(`Task with id ${taskId} not found`);
            const subtask = {
                id: task.subtasks.length + 1,
                text,
                isCompleted: false,
            };
            await task.updateOne({
                $push: { subtasks: subtask }
            });
            task.subtasks.push(subtask);
            return await task.populate('files');
        }
        catch (error) {
            throw error;
        }
    }
    async toggleSubtask({ subtaskId, taskId }) {
        try {
            if (!subtaskId || !taskId)
                throw new common_1.BadRequestException('"subtaskId" and "taskId" is requred fields');
            const task = await this.taskModel.findById(taskId);
            if (!task)
                throw new common_1.NotFoundException(`Task with id ${taskId} not found`);
            const curSubtask = task.subtasks.find(task => task.id === subtaskId);
            const newIsCompleted = curSubtask.isCompleted ? false : true;
            await this.taskModel.updateOne({ _id: taskId, 'subtasks.id': subtaskId }, { $set: { 'subtasks.$.isCompleted': newIsCompleted }
            });
            curSubtask.isCompleted = newIsCompleted;
            return await task.populate('files');
        }
        catch (error) {
            throw error;
        }
    }
    async deleteSubtask(taskId, subtaskId) {
        try {
            if (!subtaskId || !taskId)
                throw new common_1.BadRequestException('"subtaskId" and "taskId" is requred fields');
            const task = await this.taskModel.findById(taskId);
            if (!task)
                throw new common_1.NotFoundException(`Task with id ${taskId} not found`);
            if (!task.subtasks.find(task => task.id === +subtaskId))
                throw new common_1.NotFoundException(`Task with id ${taskId} has no such subtask with id ${subtaskId}`);
            await task.updateOne({
                $pull: {
                    subtasks: { id: +subtaskId },
                }
            });
            task.subtasks = task.subtasks.filter(task => task.id !== +subtaskId);
            return await task.populate('files');
        }
        catch (error) {
            throw error;
        }
    }
    async delete(taskId) {
        if (!taskId)
            throw new common_1.BadRequestException('"taskId" is required field');
        const task = await this.taskModel.findById(taskId);
        if (!task)
            throw new common_1.NotFoundException(`Task with id ${taskId} not found`);
        await task.deleteOne();
        return task;
    }
};
exports.TaskService = TaskService;
exports.TaskService = TaskService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(task_schema_1.Task.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], TaskService);
//# sourceMappingURL=task.service.js.map