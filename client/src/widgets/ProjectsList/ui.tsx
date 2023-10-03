import { FETCH_PROJECTS, ProjectCard } from '@/entities/project'
import { useAppDispatch, useAppSelector } from '@/shared/lib'

export const ProjectsList = () => {
  const projects = useAppSelector(({ projects }) => projects.projects)
  const loading = useAppSelector(({ projects }) => projects.loading)
  const error = useAppSelector(({ projects }) => projects.error)
  const dispatch = useAppDispatch()

  const fetchHandler = () => {
    dispatch({type: FETCH_PROJECTS})
  }

  return <>
    <button onClick={fetchHandler}>123</button>
    {projects.length > 0 && projects.map(project => (
      <ProjectCard key={project._id} project={project} />
    ))}
  </>
}