import { applyMiddleware, compose, legacy_createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'

import { fetchProjectsWatcher } from './sagas'
import { projectsReducer } from './reducer'

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const sagaMiddleware = createSagaMiddleware()
export const store = legacy_createStore(
  projectsReducer,
  composeEnhancers(applyMiddleware(sagaMiddleware)),
)

sagaMiddleware.run(fetchProjectsWatcher)

export const action = (type: string) => store.dispatch({ type })