import { Project } from "@/entities/project"
import { ProjectPopulated } from "@/entities/project/model/types"
import { Subtask, Task } from "./types"

// todo fix boilerplate

export const FETCH_TASKS = 'FETCH_TASKS'
export const FETCH_TASKS_PENDING = 'FETCH_TASKS_PENDING'
export const FETCH_TASKS_FULFILLED = 'FETCH_TASKS_FULFILLED'
export const FETCH_TASKS_REJECTED = 'FETCH_TASKS_REJECTED'

export const CREATE_TASK = 'CREATE_TASK'
export const CREATE_TASK_PENDING = 'CREATE_TASK_PENDING'
export const CREATE_TASK_FULFILLED = 'CREATE_TASK_FULFILLED'
export const CREATE_TASK_REJECTED = 'CREATE_TASK_REJECTED'

export const CHANGE_TASK_STATUS = 'CHANGE_TASK_STATUS'
export const CHANGE_TASK_STATUS_PENDING = 'CHANGE_TASK_STATUS_PENDING'
export const CHANGE_TASK_STATUS_FULFILLED = 'CHANGE_TASK_STATUS_FULFILLED'
export const CHANGE_TASK_STATUS_REJECTED = 'CHANGE_TASK_STATUS_REJECTED'

export const DELETE_TASK = 'DELETE_TASK'
export const DELETE_TASK_PENDING = 'DELETE_TASK_PENDING'
export const DELETE_TASK_FULFILLED = 'DELETE_TASK_FULFILLED'
export const DELETE_TASK_REJECTED = 'DELETE_TASK_REJECTED'

export const CREATE_SUBTASK = 'CREATE_SUBTASK'
export const CREATE_SUBTASK_PENDING = 'CREATE_SUBTASK_PENDING'
export const CREATE_SUBTASK_FULFILLED = 'CREATE_SUBTASK_FULFILLED'
export const CREATE_SUBTASK_REJECTED = 'CREATE_SUBTASK_REJECTED'

export const TOGGLE_SUBTASK = 'TOGGLE_SUBTASK'
export const TOGGLE_SUBTASK_PENDING = 'TOGGLE_SUBTASK_PENDING'
export const TOGGLE_SUBTASK_FULFILLED = 'TOGGLE_SUBTASK_FULFILLED'
export const TOGGLE_SUBTASK_REJECTED = 'TOGGLE_SUBTASK_REJECTED'

export const DELETE_SUBTASK = 'DELETE_SUBTASK'
export const DELETE_SUBTASK_PENDING = 'DELETE_SUBTASK_PENDING'
export const DELETE_SUBTASK_FULFILLED = 'DELETE_SUBTASK_FULFILLED'
export const DELETE_SUBTASK_REJECTED = 'DELETE_SUBTASK_REJECTED'





export interface FetchTasks {
  type: typeof FETCH_TASKS;
  payload: Project['_id']
}

interface FetchTasksPendingAction {
  type: typeof FETCH_TASKS_PENDING;
  payload: Project['_id'];
}

interface FetchTasksFulfilledAction {
  type: typeof FETCH_TASKS_FULFILLED;
  payload: ProjectPopulated;
}

interface FetchTasksRejectedAction {
  type: typeof FETCH_TASKS_REJECTED;
  payload: Error['message']
}





export interface CreateTask {
  type: typeof CREATE_TASK;
  payload: FormData
}

interface CreateTaskPendingAction {
  type: typeof CREATE_TASK_PENDING;
}

interface CreateTaskFulfilledAction {
  type: typeof CREATE_TASK_FULFILLED;
  payload: Task;
}

interface CreateTaskRejectedAction {
  type: typeof CREATE_TASK_REJECTED;
  payload: Error['message']
}





export interface ChangeTaskStatus {
  type: typeof CHANGE_TASK_STATUS;
  payload: ChangeTaskStatusDto
}

interface ChangeTaskStatusPendingAction {
  type: typeof CHANGE_TASK_STATUS_PENDING;
  payload: Task['_id']
}

interface ChangeTaskStatusFulfilledAction {
  type: typeof CHANGE_TASK_STATUS_FULFILLED;
  payload: Task;
}

interface ChangeTaskStatusRejectedAction {
  type: typeof CHANGE_TASK_STATUS_REJECTED;
  payload: Error['message']
}





export interface DeleteTask {
  type: typeof DELETE_TASK;
  payload: DeleteTaskDto;
}

interface DeleteTaskPendingAction {
  type: typeof DELETE_TASK_PENDING;
}

interface DeleteTaskFulfilledAction {
  type: typeof DELETE_TASK_FULFILLED;
  payload: Task;
}

interface DeleteTaskRejectedAction {
  type: typeof DELETE_TASK_REJECTED;
  payload: Error['message']
}






export interface CreateSubtask {
  type: typeof CREATE_SUBTASK;
  payload: CreateSubtaskDto;
}

interface CreateSubtaskPendingAction {
  type: typeof CREATE_SUBTASK_PENDING;
}

interface CreateSubtaskFulfilledAction {
  type: typeof CREATE_SUBTASK_FULFILLED;
  payload: Task;
}

interface CreateSubtaskRejectedAction {
  type: typeof CREATE_SUBTASK_REJECTED;
  payload: Error['message']
}




export interface ToggleSubtask {
  type: typeof TOGGLE_SUBTASK;
  payload: ToggleSubtaskDto;
}

interface ToggleSubtaskPendingAction {
  type: typeof TOGGLE_SUBTASK_PENDING;
}

interface ToggleSubtaskFulfilledAction {
  type: typeof TOGGLE_SUBTASK_FULFILLED;
  payload: Task;
}

interface ToggleSubtaskRejectedAction {
  type: typeof TOGGLE_SUBTASK_REJECTED;
  payload: Error['message']
}



export interface DeleteSubtask {
  type: typeof DELETE_SUBTASK;
  payload: DeleteSubtaskDto;
}

interface DeleteSubtaskPendingAction {
  type: typeof DELETE_SUBTASK_PENDING;
}

interface DeleteSubtaskFulfilledAction {
  type: typeof DELETE_SUBTASK_FULFILLED;
  payload: Task;
}

interface DeleteSubtaskRejectedAction {
  type: typeof DELETE_SUBTASK_REJECTED;
  payload: Error['message']
}




export type TaskActions =
| FetchTasksPendingAction
| FetchTasksFulfilledAction
| FetchTasksRejectedAction
| CreateTaskPendingAction
| CreateTaskFulfilledAction
| CreateTaskRejectedAction
| ChangeTaskStatusPendingAction
| ChangeTaskStatusFulfilledAction
| ChangeTaskStatusRejectedAction
| DeleteTaskPendingAction
| DeleteTaskFulfilledAction
| DeleteTaskRejectedAction
| CreateSubtaskPendingAction
| CreateSubtaskFulfilledAction
| CreateSubtaskRejectedAction
| ToggleSubtaskPendingAction
| ToggleSubtaskFulfilledAction
| ToggleSubtaskRejectedAction
| DeleteSubtaskPendingAction
| DeleteSubtaskFulfilledAction
| DeleteSubtaskRejectedAction

export type DispatchTaskActions = 
| FetchTasks
| CreateTask
| ChangeTaskStatus
| DeleteTask
| CreateSubtask
| ToggleSubtask
| DeleteSubtask



export const fetchTasksAction = (projectId: Project['_id']): FetchTasks => ({
  type: FETCH_TASKS,
  payload: projectId,

})


export interface CreateTaskDto extends Pick<Partial<Task>, 'title' | 'completedAt' | 'priority' | 'files'> {
  title: string;
  description: string;
  projectId: string;
}

export const createTaskAction = (data: FormData): CreateTask => ({
  type: CREATE_TASK,
  payload: data,
})


export interface ChangeTaskStatusDto {
  taskId: Task['_id'],
  status: 'queue' | 'dev' | 'done'
}

export const changeTaskStatusAction = (data: ChangeTaskStatusDto): ChangeTaskStatus => ({
  type: CHANGE_TASK_STATUS,
  payload: data,
})


export interface DeleteTaskDto {
  taskId: Task['_id'],
  projectId: Project['_id'];
}

export const deleteTaskAction = (data: DeleteTaskDto): DeleteTask => ({
  type: DELETE_TASK,
  payload: data,
})


export interface CreateSubtaskDto {
  text: string;
  taskId: Task['_id']
}

export const createSubtaskACtion = (data: CreateSubtaskDto): CreateSubtask => ({
  type: CREATE_SUBTASK,
  payload: data,
})



export interface ToggleSubtaskDto {
  taskId: Task['_id'];
  subtaskId: Subtask['id']
}

export const toggleSubtaskACtion = (data: ToggleSubtaskDto): ToggleSubtask => ({
  type: TOGGLE_SUBTASK,
  payload: data,
})


export interface DeleteSubtaskDto extends ToggleSubtaskDto{}

export const deleteSubtaskACtion = (data: DeleteSubtaskDto): DeleteSubtask => ({
  type: DELETE_SUBTASK,
  payload: data,
})