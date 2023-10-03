import { put, call } from 'redux-saga/effects'
import { AxiosResponse } from 'axios'

import { FETCH_PROJECTS_FULFILLED, FETCH_PROJECTS_PENDING, FETCH_PROJECTS_REJECTED } from './reducer'
import { fetchProjects } from '../api'
import { Project } from './types'

export function* fetchProjectsWorker() {
  yield put({ type: FETCH_PROJECTS_PENDING })
  try {
    const data: AxiosResponse<Project[]> = yield call(fetchProjects)
    yield put({ type: FETCH_PROJECTS_FULFILLED, payload: data.data })
  } catch (error: any) {
    yield put({ type: FETCH_PROJECTS_REJECTED, payload: error.message })
  }
}
