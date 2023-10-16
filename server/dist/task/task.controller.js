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
exports.TaskController = void 0;
const common_1 = require("@nestjs/common");
const multer_1 = require("multer");
const path_1 = require("path");
const create_task_dto_1 = require("./dto/create-task.dto");
const change_status_dto_1 = require("./dto/change-status.dto");
const task_service_1 = require("./task.service");
const project_service_1 = require("../project/project.service");
const platform_express_1 = require("@nestjs/platform-express");
const file_service_1 = require("../file/file.service");
let TaskController = class TaskController {
    constructor(taskService, projectService, fileService) {
        this.taskService = taskService;
        this.projectService = projectService;
        this.fileService = fileService;
    }
    async createTask(files, createTaskDto) {
        try {
            if (!createTaskDto.projectId)
                throw new common_1.BadRequestException('Field "projectId" is required field');
            const project = await this.projectService.getOne(createTaskDto.projectId);
            const createdFiles = [];
            for (let i = 0; i < files.length; i++) {
                createdFiles.push(await this.fileService.create(files[i]));
            }
            const task = await this.taskService.create(createTaskDto);
            await task.updateOne({
                $set: { files: createdFiles.map(file => file._id) }
            });
            await project.updateOne({
                $push: { tasks: task._id }
            });
            return await task.populate('files');
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error.message);
        }
    }
    async changeStatus(changeStatusDto) {
        try {
            return await this.taskService.changeStatus(changeStatusDto);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error.message);
        }
    }
    async addSubtask(addSubtaskDto) {
        return await this.taskService.addSubtask(addSubtaskDto);
    }
    async toggleSubtask(toggleSubtaskDto) {
        return await this.taskService.toggleSubtask(toggleSubtaskDto);
    }
    async deleteSubtask(taskId, subtaskId) {
        return await this.taskService.deleteSubtask(taskId, subtaskId);
    }
    async deleteTask(taskId, projectId) {
        if (!taskId || !projectId)
            throw new common_1.BadRequestException('"taskId" and "projectId" is required fields');
        const task = await this.taskService.delete(taskId);
        const project = await this.projectService.getOne(projectId);
        await project.updateOne({
            $pull: {
                tasks: task._id
            }
        });
        return task;
    }
};
exports.TaskController = TaskController;
__decorate([
    (0, common_1.Post)('create'),
    (0, common_1.UseInterceptors)((0, platform_express_1.AnyFilesInterceptor)({
        storage: (0, multer_1.diskStorage)({
            destination: 'public/files',
            filename: (req, file, cb) => {
                const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
                cb(null, `${randomName}${(0, path_1.extname)(file.originalname)}`);
            }
        })
    })),
    __param(0, (0, common_1.UploadedFiles)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, create_task_dto_1.CreateTaskDto]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "createTask", null);
__decorate([
    (0, common_1.Post)('changestatus'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [change_status_dto_1.ChangeStatusDto]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "changeStatus", null);
__decorate([
    (0, common_1.Post)('addsubtask'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "addSubtask", null);
__decorate([
    (0, common_1.Patch)('togglesubtask'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "toggleSubtask", null);
__decorate([
    (0, common_1.Delete)('deletesubtask'),
    __param(0, (0, common_1.Query)('taskId')),
    __param(1, (0, common_1.Query)('subtaskId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "deleteSubtask", null);
__decorate([
    (0, common_1.Delete)('delete'),
    __param(0, (0, common_1.Query)('taskId')),
    __param(1, (0, common_1.Query)('projectId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "deleteTask", null);
exports.TaskController = TaskController = __decorate([
    (0, common_1.Controller)('task'),
    __metadata("design:paramtypes", [task_service_1.TaskService,
        project_service_1.ProjectService,
        file_service_1.FileService])
], TaskController);
//# sourceMappingURL=task.controller.js.map