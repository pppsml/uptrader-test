import { Reducer } from 'redux'

import { Project } from '@/entities/project'

export const FETCH_PROJECTS = 'FETCH_PROJECTS'
export const FETCH_PROJECTS_PENDING = 'FETCH_PROJECTS_PENDING'
export const FETCH_PROJECTS_FULFILLED = 'FETCH_PROJECTS_FULFILLED'
export const FETCH_PROJECTS_REJECTED = 'FETCH_PROJECTS_REJECTED'

export interface ProjectsState {
  projects: Project[];
  loading: boolean;
  error: Error | null;
}

const initState: ProjectsState = {
  projects: [],
  loading: false,
  error: null,
}

export const projectsReducer: Reducer<ProjectsState> = (state = initState, action) => {
  switch(action.type) {

    case FETCH_PROJECTS_PENDING: 
      return {
        ...state,
        loading: true,
        error: null,
      }

    case FETCH_PROJECTS_FULFILLED:
      return {
        ...state,
        loading: false,
        error: null,
        projects: [...state.projects, ...action.payload],
      }

    case FETCH_PROJECTS_REJECTED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }

    default: return state
  }
}