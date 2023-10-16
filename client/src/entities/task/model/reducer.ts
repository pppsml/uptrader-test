import { Reducer } from "redux";

// todo fix boilerplate

import {
  type TaskActions,

  FETCH_TASKS_PENDING,
  FETCH_TASKS_FULFILLED,
  FETCH_TASKS_REJECTED,

  CREATE_TASK_PENDING,
  CREATE_TASK_FULFILLED,
  CREATE_TASK_REJECTED,
  
  CHANGE_TASK_STATUS_PENDING,
  CHANGE_TASK_STATUS_FULFILLED,
  CHANGE_TASK_STATUS_REJECTED,

  DELETE_TASK_PENDING,
  DELETE_TASK_FULFILLED,
  DELETE_TASK_REJECTED,


  CREATE_SUBTASK_PENDING,
  CREATE_SUBTASK_FULFILLED,

  TOGGLE_SUBTASK_PENDING,
  TOGGLE_SUBTASK_FULFILLED,

  DELETE_SUBTASK_PENDING,
  DELETE_SUBTASK_FULFILLED,
  CREATE_SUBTASK_REJECTED,
  TOGGLE_SUBTASK_REJECTED,
  DELETE_SUBTASK_REJECTED,
} from './actions'
import { Task } from './types'

interface TasksState {
  projectId: string | null;
  projectName: string | null;
  tasks: Task[];
  loading: boolean;
  error: Error['message'] | null;

  creatingLoading: boolean;
  creatingError: Error['message'] | null;

  changingTaskStatusId: Task['_id'] | null;
  changingTaskStatusLoading: boolean;
  changingTaskStatusError: Error['message'] | null;

  deletingLoading: boolean;

  createSubtaskLoading: boolean;
  toggleSubtaskLoading: boolean;
  deleteSubtaskLoading: boolean;
}

const initialState: TasksState = {
  projectId: null,
  projectName: null,
  tasks: [],
  loading: false,
  error: null,

  creatingLoading: false,
  creatingError: null,

  changingTaskStatusId: null,
  changingTaskStatusLoading: false,
  changingTaskStatusError: null,

  deletingLoading: false,

  createSubtaskLoading: false,
  toggleSubtaskLoading: false,
  deleteSubtaskLoading: false,
}

export const taskReducer: Reducer<TasksState, TaskActions> = (state = initialState, action) => {
  switch(action.type) {

    case FETCH_TASKS_PENDING: 
      return {
        ...state,
        loading: true,
        error: null,
        tasks: [],
        projectId: action.payload
      }

    case FETCH_TASKS_FULFILLED:
      return {
        ...state,
        loading: false,
        error: null,
        tasks: action.payload.tasks,
        projectName: action.payload.name
      }

    case FETCH_TASKS_REJECTED:
      return {
        ...state,
        loading: false,
        error: action.payload,
        tasks: [],
        projectId: null,
      }


    case CREATE_TASK_PENDING: 
      return {
        ...state,
        creatingLoading: true,
        creatingError: null,
      }

    case CREATE_TASK_FULFILLED:
      return {
        ...state,
        creatingLoading: false,
        tasks: [...state.tasks, action.payload],
      }

    case CREATE_TASK_REJECTED:
      return {
        ...state,
        creatingLoading: false,
        creatingError: action.payload,
      }


    case CHANGE_TASK_STATUS_PENDING: 
      return {
        ...state,
        changingTaskStatusId: action.payload,
      }

    case CHANGE_TASK_STATUS_FULFILLED:
      return {
        ...state,
        changingTaskStatusId: null,
        tasks: [...state.tasks.filter(task => task._id !== action.payload._id), action.payload],
      }

    case CHANGE_TASK_STATUS_REJECTED:
      return {
        ...state,
        changingTaskStatusId: null,
      }


    case DELETE_TASK_PENDING: 
      return {
        ...state,
        deletingLoading: true,
      }

    case DELETE_TASK_FULFILLED:
      return {
        ...state,
        deletingLoading: false,
        tasks: state.tasks.filter(task => task._id !== action.payload._id)
      }

    case DELETE_TASK_REJECTED:
      return {
        ...state,
        deletingLoading: false,
      }




    case CREATE_SUBTASK_PENDING: 
      return {
        ...state,
        createSubtaskLoading: true,
      }

    case CREATE_SUBTASK_FULFILLED:
      return {
        ...state,
        createSubtaskLoading: false,
        tasks: [...state.tasks.filter(task => task._id !== action.payload._id), action.payload],
      }

    case CREATE_SUBTASK_REJECTED:
      return {
        ...state,
        createSubtaskLoading: false,
      }



    case TOGGLE_SUBTASK_PENDING: 
      return {
        ...state,
        toggleSubtaskLoading: true,
      }

    case TOGGLE_SUBTASK_FULFILLED:
      return {
        ...state,
        toggleSubtaskLoading: false,
        tasks: [...state.tasks.filter(task => task._id !== action.payload._id), action.payload],
      }

    case TOGGLE_SUBTASK_REJECTED:
      return {
        ...state,
        toggleSubtaskLoading: false,
      }



    case DELETE_SUBTASK_PENDING: 
      return {
        ...state,
        deleteSubtaskLoading: true,
      }

    case DELETE_SUBTASK_FULFILLED:
      return {
        ...state,
        deleteSubtaskLoading: false,
        tasks: [...state.tasks.filter(task => task._id !== action.payload._id), action.payload],
      }

    case DELETE_SUBTASK_REJECTED:
      return {
        ...state,
        deleteSubtaskLoading: false,
      }

    default: return state
  }
}