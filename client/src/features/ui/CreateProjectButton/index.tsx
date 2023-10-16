import { createProjectAction } from "@/entities/project/model/actions"
import { useDisclosure, useAppDispatch, useAppSelector } from "@/shared/lib"
import { Button, Input, Modal, ModalProps } from "@/shared/ui"
import { ChangeEventHandler, useState } from "react"

interface Props extends Omit<ModalProps, 'title' | 'bottomContent'> {

}

const CreateProjectModal = (props: Props) => {
  const [ projectName, setProjectName ] = useState<string>('')
  const { creatingError, creatingLoading } = useAppSelector(({ projects }) => projects)
  const dispatch = useAppDispatch()

  const createProjectHandler = () => {
    dispatch(createProjectAction(projectName.trim()))
    setProjectName('')
  }

  const inputChangeHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
    setProjectName(e.target.value)
  } 

  return (
    <Modal
    bottomContent={<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '.5rem' }}>
      <Button onClick={props.close} variant="outline">Отмена</Button>
      <Button onClick={createProjectHandler} disabled={creatingLoading || !projectName.trim()}>Создать</Button>
    </div>}
    title="Создание проекта"
    {...props}>
      <Input required value={projectName} onChange={inputChangeHandler} label="Имя проекта" />
      {creatingError && <p style={{ color: 'red', marginTop: '.5rem' }}>{creatingError}</p>}
    </Modal>
  )
}

export const CreateProjectButton = () => {
  const [ opened, { open, close } ] = useDisclosure()

  return (
    <>
      <Button onClick={open}>Создать проект</Button>
      <CreateProjectModal opened={opened} close={close} />
    </>
  )
}
