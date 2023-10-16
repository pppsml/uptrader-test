import { AxiosResponse } from 'axios'

import { AxiosInstanse } from "@/shared/api";
import { Project } from "./model";

export const fetchProjects = async (): Promise<AxiosResponse<Project[]>> => await AxiosInstanse.get<Project[]>('/project/getall')

export const createProject = async (projectName: Project['name']): Promise<AxiosResponse<Project>> => await AxiosInstanse.post<Project>('/project/create', {
  name: projectName,
})

export const deleteProject = async (projectId: Project['_id']): Promise<AxiosResponse<Project>> => await AxiosInstanse.delete<Project>(`/project/delete?projectId=${projectId}`)