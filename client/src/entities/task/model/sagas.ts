import { AxiosResponse } from 'axios'
import { call, put } from 'redux-saga/effects'

import {
  FetchTasks,
  FETCH_TASKS_PENDING,
  FETCH_TASKS_FULFILLED,
  FETCH_TASKS_REJECTED,

  CreateTask,
  CREATE_TASK_PENDING,
  CREATE_TASK_FULFILLED,
  CREATE_TASK_REJECTED,
  
  ChangeTaskStatus,
  CHANGE_TASK_STATUS_PENDING,
  CHANGE_TASK_STATUS_FULFILLED,
  CHANGE_TASK_STATUS_REJECTED,
  
  DeleteTask,
  DELETE_TASK_PENDING,
  DELETE_TASK_FULFILLED,
  DELETE_TASK_REJECTED,

  CreateSubtask,
  CREATE_SUBTASK_PENDING,
  CREATE_SUBTASK_FULFILLED,

  ToggleSubtask,
  TOGGLE_SUBTASK_PENDING,
  TOGGLE_SUBTASK_FULFILLED,

  DeleteSubtask,
  DELETE_SUBTASK_PENDING,
  DELETE_SUBTASK_FULFILLED,
  CREATE_SUBTASK_REJECTED,
  TOGGLE_SUBTASK_REJECTED,
  DELETE_SUBTASK_REJECTED,
} from './actions'
import { Task } from './types'
import { fetchTasks, createTask, changeTaskStatus, deleteTask, createSubtask, toggleSubtask, deleteSubtask } from '../api'

export function* fetchTasksWorker(action: FetchTasks) {
  yield put({ type: FETCH_TASKS_PENDING, payload: action.payload })
  try {
    const data: AxiosResponse<Task[]> = yield call(fetchTasks, action.payload)
    yield put({ type: FETCH_TASKS_FULFILLED, payload: data.data })
  } catch (error: any) {
    console.log(error)
    yield put({ type: FETCH_TASKS_REJECTED, payload: error.response?.data?.message || error.message })
  }
}


export function* createTaskWorker(action: CreateTask) {
  yield put({ type: CREATE_TASK_PENDING })
  try {
    const data: AxiosResponse<Task> = yield call(createTask, action.payload)
    yield put({ type: CREATE_TASK_FULFILLED, payload: data.data })
  } catch (error: any) {
    yield put({ type: CREATE_TASK_REJECTED, payload: error.response?.data?.message || error.message })
  }
}


export function* changeTaskStatusWorker(action: ChangeTaskStatus) {
  yield put({ type: CHANGE_TASK_STATUS_PENDING, payload: action.payload.taskId })
  try {
    const data: AxiosResponse<Task> = yield call(changeTaskStatus, action.payload)
    yield put({ type: CHANGE_TASK_STATUS_FULFILLED, payload: data.data })
  } catch (error: any) {
    yield put({ type: CHANGE_TASK_STATUS_REJECTED, payload: error.response?.data?.message || error.message })
  }
}


export function* deleteTaskWorker(action: DeleteTask) {
  yield put({ type: DELETE_TASK_PENDING, payload: action.payload.taskId })
  try {
    const data: AxiosResponse<Task> = yield call(deleteTask, action.payload)
    yield put({ type: DELETE_TASK_FULFILLED, payload: data.data })
  } catch (error: any) {
    yield put({ type: DELETE_TASK_REJECTED, payload: error.response?.data?.message || error.message })
  }
}



export function* createSubtaskWorker(action: CreateSubtask) {
  yield put({ type: CREATE_SUBTASK_PENDING, payload: action.payload.taskId })
  try {
    const data: AxiosResponse<Task> = yield call(createSubtask, action.payload)
    yield put({ type: CREATE_SUBTASK_FULFILLED, payload: data.data })
  } catch (error: any) {
    yield put({ type: CREATE_SUBTASK_REJECTED, payload: error.response?.data?.message || error.message })
  }
}



export function* toggleSubtaskWorker(action: ToggleSubtask) {
  yield put({ type: TOGGLE_SUBTASK_PENDING, payload: action.payload.taskId })
  try {
    const data: AxiosResponse<Task> = yield call(toggleSubtask, action.payload)
    yield put({ type: TOGGLE_SUBTASK_FULFILLED, payload: data.data })
  } catch (error: any) {
    yield put({ type: TOGGLE_SUBTASK_REJECTED, payload: error.response?.data?.message || error.message })
  }
}



export function* deleteSubtaskWorker(action: DeleteSubtask) {
  yield put({ type: DELETE_SUBTASK_PENDING, payload: action.payload.taskId })
  try {
    const data: AxiosResponse<Task> = yield call(deleteSubtask, action.payload)
    yield put({ type: DELETE_SUBTASK_FULFILLED, payload: data.data })
  } catch (error: any) {
    yield put({ type: DELETE_SUBTASK_REJECTED, payload: error.response?.data?.message || error.message })
  }
}