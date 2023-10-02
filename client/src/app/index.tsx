import { Routes, Route } from 'react-router-dom'
import { lazily } from 'react-lazily'


import { MainLayout } from './layouts/main'

const {
  ProjectListPage,
  TaskListPage,
} = lazily(() => import('@/pages'))

export const App = () => {
  return (
    <Routes>
      <Route path='/' element={<MainLayout />}>
        <Route path='/' element={<ProjectListPage />}></Route>
        <Route path=':projectId' element={<TaskListPage />}></Route>
      </Route>
    </Routes>
  )
}
