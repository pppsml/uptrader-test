import { takeLatest } from 'redux-saga/effects'

import { FETCH_PROJECTS, fetchProjectsWorker } from '@/entities/project'

export function* rootSaga() {
  yield takeLatest(FETCH_PROJECTS, fetchProjectsWorker)
}