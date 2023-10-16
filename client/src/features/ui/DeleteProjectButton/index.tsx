import { TbTrash } from 'react-icons/tb'

import { Button, Modal, ModalProps } from "@/shared/ui"
import { deleteProjectAction, Project } from '@/entities/project'

import classes from './DeleteProjectButton.module.css'
import { useAppDispatch, useDisclosure } from '@/shared/lib'

interface DeleteProjectModalProps extends Omit<ModalProps, 'title' | 'bottomContent'> {
  project: Project
}

const DeleteProjectModal = (props: DeleteProjectModalProps) => {
  const dispatch = useAppDispatch()

  const deleteProjectHandler = () => {
    dispatch(deleteProjectAction(props.project._id))
  }

  return (
    <Modal
    bottomContent={<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '.5rem' }}>
      <Button onClick={props.close} variant="outline">Отменить</Button>
      <Button onClick={deleteProjectHandler}>Удалить</Button>
    </div>}
    title="Удаление проекта"
    {...props}>
      <p>Вы уверены что хотите удалить проект </p>
      <p>"{props.project.name}"?</p>
    </Modal>
  )
}



interface Props {
  project: Project
}

export const DeleteProjectButton = ({ project }: Props) => {
  const [ opened, { open, close } ] = useDisclosure()


  return (
    <>
      <Button onClick={open} className={classes.deleteButton} variant='subtle'>
        <TbTrash size='85%' />
      </Button>
      <DeleteProjectModal opened={opened} close={close} project={project} />
    </>
  )
}