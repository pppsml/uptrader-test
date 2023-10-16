import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom'

import { Button, Card } from '@/shared/ui'
import { Project } from '../../model'

import classes from './ProjectCard.module.css'

interface Props {
  project: Project;
  topRightContent?: ReactNode;
  bottomContent?: ReactNode;
}

export const ProjectCard = ({ project, topRightContent, bottomContent, }: Props) => {
  const navigate = useNavigate()

  const navigateHandle = () => {
    navigate(`/project/${project._id}`)
  }

  return (
    <Card>
      <div className={classes.container}>
        <div className={classes['card__item--top']}>
          <h3 title={project.name} className={classes.projectName}>{project.name}</h3>
          {topRightContent}
        </div>
        <div className={'123'}>
          <p>всего задач: {project.tasks.length}</p>
        </div>
        <div className={classes['card__item--bottom']}>
          {bottomContent}
          <Button onClick={navigateHandle}>Перейти</Button>
        </div>
      </div>
    </Card>
  )
}