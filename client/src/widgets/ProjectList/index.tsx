import { useEffect } from 'react'

import { fetchProjectsAction, Project, ProjectCard } from '@/entities/project'
import { DeleteProjectButton, CreateProjectButton } from '@/features/ui'
import { useAppDispatch, useAppSelector } from '@/shared/lib'
import { Button } from '@/shared/ui'

import classes from './ProjectList.module.css'

interface ProjectCardWithFeaturesProps {
  project: Project;
}

const ProjectCardWithFeatures = ({ project }: ProjectCardWithFeaturesProps) => {
  return (
  <ProjectCard
    key={project._id}
    project={project}
    topRightContent={<DeleteProjectButton project={project} />}
  />
  )
}

export const ProjectList = () => {
  const { projects, error, loading } = useAppSelector(({ projects }) => projects)
  const dispatch = useAppDispatch()

  const fetchHandler = () => {
    dispatch(fetchProjectsAction())
  }

  useEffect(() => {
    fetchHandler()
  }, [])

  return (
    <>
      <div className={classes.buttons}>
        <Button onClick={fetchHandler}>Загрузить проекты</Button>
        <CreateProjectButton />
      </div>
      <div className={classes.container}>
        {loading && <p>Загрузка...</p>}
        {error && <p style={{ color: 'red' }}>Не удалось загрузить список проектов: {error}</p>}
        {projects.length > 0 && projects.map(project => (
          <ProjectCardWithFeatures key={project._id} project={project} />
        ))}
        {!error && projects.length === 0 && <p>В данный момент проектов нет, создайте свой первый проект.</p>}
      </div>
    </>
  )
}