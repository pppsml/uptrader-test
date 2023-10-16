import axios, { AxiosResponse } from 'axios'

import { AxiosInstanse } from "@/shared/api";
import { Task } from "./model";
import { Project } from '../project';
import { ChangeTaskStatusDto, CreateSubtaskDto, CreateTaskDto, DeleteSubtaskDto, DeleteTaskDto, ToggleSubtaskDto } from './model/actions';

export const fetchTasks = async (projectId: Project['_id']): Promise<AxiosResponse<Task[]>> => await AxiosInstanse.get<Task[]>(`/project/getone?projectId=${projectId}`)

export const createTask = async (data: CreateTaskDto): Promise<AxiosResponse<Task>> =>
  await axios({
    url: 'http://localhost:3000/task/create',
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data,
  })

export const changeTaskStatus = async (data: ChangeTaskStatusDto) : Promise<AxiosResponse<Task>> => 
  await AxiosInstanse.post<Task>('/task/changestatus', {
    ...data,
  })

export const deleteTask = async (data: DeleteTaskDto) : Promise<AxiosResponse<Task>> => 
  await AxiosInstanse.delete<Task>(`/task/delete?taskId=${data.taskId}&projectId=${data.projectId}`)


  
export const createSubtask = async (data: CreateSubtaskDto) : Promise<AxiosResponse<Task>> => 
  await AxiosInstanse.post<Task>('/task/addsubtask', {
    ...data,
  })

export const toggleSubtask = async (data: ToggleSubtaskDto) : Promise<AxiosResponse<Task>> => 
  await AxiosInstanse.patch<Task>('/task/togglesubtask', {
    ...data,
  })

export const deleteSubtask = async (data: DeleteSubtaskDto) : Promise<AxiosResponse<Task>> => 
  await AxiosInstanse.delete<Task>(`/task/deletesubtask?taskId=${data.taskId}&subtaskId=${data.subtaskId}`)