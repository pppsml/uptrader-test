import { takeLatest, takeEvery } from 'redux-saga/effects'

import {
  FETCH_PROJECTS, fetchProjectsWorker,
  CREATE_PROJECT, createProjectWorker,
  DELETE_PROJECT, deleteProjectWorker,
} from '@/entities/project'
import {
  FETCH_TASKS, fetchTasksWorker,
  CREATE_TASK, createTaskWorker,
  CHANGE_TASK_STATUS, changeTaskStatusWorker,
  DELETE_TASK, deleteTaskWorker, toggleSubtaskWorker, createSubtaskWorker, deleteSubtaskWorker } from '@/entities/task'
import { CREATE_SUBTASK, DELETE_SUBTASK, TOGGLE_SUBTASK } from '@/entities/task/model/actions'

export function* rootSaga() {
  yield takeLatest(FETCH_PROJECTS, fetchProjectsWorker)
  yield takeLatest(FETCH_TASKS, fetchTasksWorker)

  yield takeLatest(CREATE_PROJECT, createProjectWorker)
  yield takeLatest(CREATE_TASK, createTaskWorker)
  yield takeLatest(CREATE_SUBTASK, createSubtaskWorker)

  yield takeLatest(CHANGE_TASK_STATUS, changeTaskStatusWorker)
  yield takeEvery(TOGGLE_SUBTASK, toggleSubtaskWorker)

  yield takeLatest(DELETE_PROJECT, deleteProjectWorker)
  yield takeLatest(DELETE_TASK, deleteTaskWorker)
  yield takeLatest(DELETE_SUBTASK, deleteSubtaskWorker)
}