import { Reducer } from 'redux'

import {
  type ProjectActions,

  FETCH_PROJECTS_PENDING,
  FETCH_PROJECTS_FULFILLED,
  FETCH_PROJECTS_REJECTED,

  CREATE_PROJECT_PENDING,
  CREATE_PROJECT_FULFILLED,
  CREATE_PROJECT_REJECTED,

  DELETE_PROJECT_PENDING,
  DELETE_PROJECT_FULFILLED,
  DELETE_PROJECT_REJECTED,
} from './actions'
import { Project } from './types';

export interface ProjectsState {
  projects: Project[];
  loading: boolean;
  error: Error['message'] | null;

  creatingLoading: boolean;
  creatingError: Error['message'] | null;
  
  deletingLoading: boolean;
  deletingError: Error['message'] | null;
}

const initState: ProjectsState = {
  projects: [],
  loading: false,
  error: null,

  creatingLoading: false,
  creatingError: null,

  deletingLoading: false,
  deletingError: null,
}

export const projectReducer: Reducer<ProjectsState, ProjectActions> = (state = initState, action) => {
  switch(action.type) {

    case FETCH_PROJECTS_PENDING: 
      return {
        ...state,
        loading: true,
        error: null,
        projects: [],
      }

    case FETCH_PROJECTS_FULFILLED:
      return {
        ...state,
        loading: false,
        error: null,
        projects: action.payload,
      }

    case FETCH_PROJECTS_REJECTED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
      
    case CREATE_PROJECT_PENDING: 
      return {
        ...state,
        creatingLoading: true,
        creatingError: null,
      }

    case CREATE_PROJECT_FULFILLED:
      return {
        ...state,
        creatingLoading: false,
        projects: [...state.projects, action.payload],
      }

    case CREATE_PROJECT_REJECTED:
      return {
        ...state,
        creatingLoading: false,
        creatingError: action.payload,
      }

    case DELETE_PROJECT_PENDING: 
      return {
        ...state,
        deletingLoading: true,
        deletingError: null,
      }

    case DELETE_PROJECT_FULFILLED:
      return {
        ...state,
        deletingLoading: false,
        projects: state.projects.filter(project => project._id !== action.payload._id)
      }

    case DELETE_PROJECT_REJECTED:
      return {
        ...state,
        deletingLoading: false,
        deletingError: action.payload,
      }

    default: return state
  }
}