import { applyMiddleware, combineReducers, compose, legacy_createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'

import { projectsReducer } from '@/entities/project'
import { rootSaga } from './sagas'

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  projects: projectsReducer,
})

const sagaMiddleware = createSagaMiddleware()
export const store = legacy_createStore(rootReducer, composeEnhancers(applyMiddleware(sagaMiddleware)))

sagaMiddleware.run(rootSaga)