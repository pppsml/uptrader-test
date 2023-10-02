import { AxiosResponse } from 'axios'

import { AxiosInstanse } from "@/shared/api";
import { Project } from "./model";

export const fetchProjects = async (): Promise<AxiosResponse<Project[]>> => await AxiosInstanse.get<Project[]>('/project/getall')