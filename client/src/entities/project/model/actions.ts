import { Project } from "./types";

export const FETCH_PROJECTS = 'FETCH_PROJECTS'
export const FETCH_PROJECTS_PENDING = 'FETCH_PROJECTS_PENDING'
export const FETCH_PROJECTS_FULFILLED = 'FETCH_PROJECTS_FULFILLED'
export const FETCH_PROJECTS_REJECTED = 'FETCH_PROJECTS_REJECTED'

export const CREATE_PROJECT = 'CREATE_PROJECT'
export const CREATE_PROJECT_PENDING = 'CREATE_PROJECT_PENDING'
export const CREATE_PROJECT_FULFILLED = 'CREATE_PROJECT_FULFILLED'
export const CREATE_PROJECT_REJECTED = 'CREATE_PROJECT_REJECTED'

export const DELETE_PROJECT = 'DELETE_PROJECT'
export const DELETE_PROJECT_PENDING = 'DELETE_PROJECT_PENDING'
export const DELETE_PROJECT_FULFILLED = 'DELETE_PROJECT_FULFILLED'
export const DELETE_PROJECT_REJECTED = 'DELETE_PROJECT_REJECTED'

export interface FetchProjects {
  type: typeof FETCH_PROJECTS;
}

export interface FetchProjectsPendingAction {
  type: typeof FETCH_PROJECTS_PENDING;
}

export interface FetchProjectsFulfilledAction {
  type: typeof FETCH_PROJECTS_FULFILLED;
  payload: Project[]
}

export interface FetchProjectsRejectedAction {
  type: typeof FETCH_PROJECTS_REJECTED;
  payload: Error['message']
}


export interface CreateProject {
  type: typeof CREATE_PROJECT;
  payload: Project['name']
}

export interface CreateProjectPendingAction {
  type: typeof CREATE_PROJECT_PENDING;
}

export interface CreateProjectFulfilledAction {
  type: typeof CREATE_PROJECT_FULFILLED;
  payload: Project;
}

export interface CreateProjectRejectedAction {
  type: typeof CREATE_PROJECT_REJECTED;
  payload: Error['message']
}


export interface DeleteProject {
  type: typeof DELETE_PROJECT;
  payload: Project['_id']
}

export interface DeleteProjectPendingAction {
  type: typeof DELETE_PROJECT_PENDING;
}

export interface DeleteProjectFulfilledAction {
  type: typeof DELETE_PROJECT_FULFILLED;
  payload: Project
}

export interface DeleteProjectRejectedAction {
  type: typeof DELETE_PROJECT_REJECTED;
  payload: Error['message']
}



export type ProjectActions =
| FetchProjectsPendingAction
| FetchProjectsFulfilledAction
| FetchProjectsRejectedAction
| CreateProjectPendingAction
| CreateProjectFulfilledAction
| CreateProjectRejectedAction
| DeleteProjectPendingAction
| DeleteProjectFulfilledAction
| DeleteProjectRejectedAction


export type DispatchProjectActions = 
| FetchProjects
| CreateProject
| DeleteProject

export const fetchProjectsAction = (): FetchProjects => ({
  type: FETCH_PROJECTS
})

export const createProjectAction = (projectName: Project['name']): CreateProject => ({
  type: CREATE_PROJECT,
  payload: projectName,
})

export const deleteProjectAction = (projectId: Project['_id']): DeleteProject => ({
  type: DELETE_PROJECT,
  payload: projectId,
})