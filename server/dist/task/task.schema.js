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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskSchema = exports.Task = exports.STATUS = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const auto_increment_1 = require("@typegoose/auto-increment");
const mongoose_2 = require("mongoose");
var STATUS;
(function (STATUS) {
    STATUS["QUEUE"] = "queue";
    STATUS["DEV"] = "dev";
    STATUS["DONE"] = "done";
})(STATUS || (exports.STATUS = STATUS = {}));
class Subtask {
}
__decorate([
    (0, mongoose_1.Prop)({ type: () => Number, required: true, }),
    __metadata("design:type", Number)
], Subtask.prototype, "id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: () => String, required: true }),
    __metadata("design:type", String)
], Subtask.prototype, "text", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: () => Boolean, required: true, default: false }),
    __metadata("design:type", Boolean)
], Subtask.prototype, "isCompleted", void 0);
let Task = class Task {
};
exports.Task = Task;
__decorate([
    (0, mongoose_1.Prop)({ type: Number, required: true, default: 0 }),
    __metadata("design:type", Number)
], Task.prototype, "_id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Task.prototype, "title", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Task.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: null }),
    __metadata("design:type", Number)
], Task.prototype, "devTimeAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: 0 }),
    __metadata("design:type", Number)
], Task.prototype, "devTime", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: null }),
    __metadata("design:type", Number)
], Task.prototype, "completedAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: 5 }),
    __metadata("design:type", Number)
], Task.prototype, "priority", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [{ type: mongoose_2.Types.ObjectId, ref: 'File' }], required: true, default: [] }),
    __metadata("design:type", Array)
], Task.prototype, "files", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: () => String, required: true, default: 'queue' }),
    __metadata("design:type", String)
], Task.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: [] }),
    __metadata("design:type", Array)
], Task.prototype, "subtasks", void 0);
exports.Task = Task = __decorate([
    (0, mongoose_1.Schema)({ timestamps: { createdAt: true, updatedAt: false }, })
], Task);
exports.TaskSchema = mongoose_1.SchemaFactory.createForClass(Task);
exports.TaskSchema.plugin(auto_increment_1.AutoIncrementID, { field: '_id' });
//# sourceMappingURL=task.schema.js.map