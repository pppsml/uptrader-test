import { Routes, Route } from 'react-router-dom'
import { lazily } from 'react-lazily'
import { Provider } from 'react-redux'

import { MainLayout } from './layouts/main'
import { store } from './store'

const {
  ProjectsPage,
  TaskListPage,
} = lazily(() => import('@/pages'))

export const App = () => {
  return (
    <Provider store={store}>
      <Routes>
        <Route path='/' element={<MainLayout />}>
          <Route path='/' element={<ProjectsPage />}></Route>
          <Route path='project/:projectId' element={<TaskListPage />}></Route>
        </Route>
      </Routes>
    </Provider>
  )
}
