
import { Card } from '@/shared/ui'
import { Project } from '../model'

interface Props {
  project: Project
}

export const ProjectCard = ({ project }: Props) => {

  return (
    <Card>
      <p>
        {JSON.stringify(project, null, 2)}
      </p>
    </Card>
  )
}