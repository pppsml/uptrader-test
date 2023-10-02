import { takeLatest, put, call } from 'redux-saga/effects'
import { AxiosResponse } from 'axios'

import { fetchProjects, Project } from '@/entities/project'
import { FETCH_PROJECTS, FETCH_PROJECTS_FULFILLED, FETCH_PROJECTS_PENDING, FETCH_PROJECTS_REJECTED } from './reducer'

function* fetchProjectsWorker() {
  yield put({ type: FETCH_PROJECTS_PENDING })
  try {
    const data: AxiosResponse<Project[]> = yield call(fetchProjects)
    yield put({ type: FETCH_PROJECTS_FULFILLED, payload: data.data })
  } catch (error: any) {
    yield put({ type: FETCH_PROJECTS_REJECTED, payload: error.message })
  }
}

export function* fetchProjectsWatcher() {
  yield takeLatest(FETCH_PROJECTS, fetchProjectsWorker)
}
