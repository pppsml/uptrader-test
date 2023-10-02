import { action } from './model'
import { FETCH_PROJECTS } from './model/reducer'

export const ProjectsList = () => {

  const fetchHandler = () => {
    action(FETCH_PROJECTS)
  }

  return <>
    <button onClick={fetchHandler}>123</button>
    ProjectsList
  </>
}