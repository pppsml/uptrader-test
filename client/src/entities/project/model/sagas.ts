import { put, call } from 'redux-saga/effects'
import { AxiosResponse } from 'axios'

import {
  FETCH_PROJECTS_PENDING,
  FETCH_PROJECTS_FULFILLED,
  FETCH_PROJECTS_REJECTED,

  CreateProject,
  CREATE_PROJECT_PENDING,
  CREATE_PROJECT_FULFILLED,
  CREATE_PROJECT_REJECTED,

  DeleteProject,
  DELETE_PROJECT_PENDING,
  DELETE_PROJECT_FULFILLED,
  DELETE_PROJECT_REJECTED,
} from './actions'
import { createProject, fetchProjects, deleteProject } from '../api'
import { Project } from './types'

export function* fetchProjectsWorker() {
  yield put({ type: FETCH_PROJECTS_PENDING })
  try {
    const data: AxiosResponse<Project[]> = yield call(fetchProjects)
    yield put({ type: FETCH_PROJECTS_FULFILLED, payload: data.data })
  } catch (error: any) {
    yield put({ type: FETCH_PROJECTS_REJECTED, payload: error.response?.data?.message || error.message })
  }
}

export function* createProjectWorker(action: CreateProject) {
  yield put({ type: CREATE_PROJECT_PENDING })
  try {
    const data: AxiosResponse<Project> = yield call(createProject, action.payload)
    yield put({ type: CREATE_PROJECT_FULFILLED, payload: data.data })
  } catch (error: any) {
    yield put({ type: CREATE_PROJECT_REJECTED, payload: error.response?.data?.message || error.message })
  }
}

export function* deleteProjectWorker(action: DeleteProject) {
  yield put({ type: DELETE_PROJECT_PENDING })
  try {
    const data: AxiosResponse<Project> = yield call(deleteProject, action.payload)
    yield put({ type: DELETE_PROJECT_FULFILLED, payload: data.data })
  } catch (error: any) {
    yield put({ type: DELETE_PROJECT_REJECTED, payload: error.response?.data?.message || error.message })
  }
}
