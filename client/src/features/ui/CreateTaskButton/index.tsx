import { FormEventHandler, useReducer, useRef } from 'react'
import { TbTrash } from 'react-icons/tb'

import { Button, Input, Modal, ModalProps, Select, Textarea } from "@/shared/ui"
import { Project } from '@/entities/project'

import classes from './CreateTaskButton.module.css'
import { formatDate, useAppDispatch, useAppSelector, useDisclosure } from '@/shared/lib'
import { createTaskAction, CreateTaskDto } from '@/entities/task'

interface CreateTaskModalProps extends Omit<ModalProps, 'title' | 'bottomContent'> {
  projectId: Project['_id']
}

const reducer = (state: CreateTaskDto, action: any) => {
  return { ...state, ...action }
}

const initialState: Omit<CreateTaskDto, 'projectId'> = {
  title: '',
  description: '',
  priority: 5,
  files: [],
  completedAt: null,
}

const options = Array.from({length: 10}, (_, i) => {
  const number = i + 1
  return {
    text: number.toString(),
    value: number
  }
})

const CreateTaskModal = ({ projectId, ...props }: CreateTaskModalProps) => {

  const [ state, setValue ] = useReducer<(state: CreateTaskDto, action: any) => typeof state>(reducer, {...initialState, projectId})
  const { title, description, completedAt, files, priority } = state
  const formRef = useRef<HTMLFormElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const todayDate = new Date()
  const todayString = formatDate(todayDate)
  const completedAtDate = completedAt ? new Date(completedAt) : null
  const completedAtString = completedAtDate ? formatDate(completedAtDate) : ''

  const { creatingError, creatingLoading } = useAppSelector(({ tasks }) => tasks)
  const dispatch = useAppDispatch()

  const createTaskHandler: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    if (!title.trim()) return 
    const formdata = new FormData(formRef.current!)
    formdata.append('projectId', projectId)

    dispatch(createTaskAction(formdata))
    setValue(initialState)

    // костыль чтобы ресетнуть значение file инпута
    fileInputRef.current!.value = ''
    fileInputRef.current!.type = 'text'
    fileInputRef.current!.type = 'file'
  }

  return (
    <Modal
    title="Создание задачи"
    {...props}>
      <form ref={formRef} onSubmit={createTaskHandler} style={{ display: 'flex', alignItems: 'stretch', gap: '1rem', flexDirection: 'column' }}>

        <Input
          label='Заголовок задачи'
          placeholder='Введите заголовок задачи'
          required
          name='title'
          value={title}
          onChange={e => setValue({ title: e.target.value })}
        />
        <Textarea
          label='Описание задачи'
          placeholder='Введите описание задачи'
          value={description}
          name='description'
          required
          onChange={e => setValue({ description: e.target.value })}
        />
        <Select
          options={options}
          label='Приоритет задачи (чем выше, тем больше приоритет)'
          value={priority}
          name='priority'
          onChange={e => setValue({ priority: +e.target.value })}
        />
        <Input
          type='date'
          min={todayString}
          value={completedAtString}
          label='Выполнить до (включительно) (необязательно)'
          name='completedAt'
          onChange={e => setValue({ completedAt: e.target.valueAsNumber + 43200000  /* 12h */ })}
        />
        <Input
          ref={fileInputRef}
          type='file'
          multiple
          label='Добавьте файлы (необязательно)'
          name='files'
          onChange={e => setValue({ files: e.target.files })}
        />
        <p style={{ color: 'red' }}>{creatingError}</p>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '.5rem' }}>
          <Button onClick={props.close} type='button' variant="outline">Отменить</Button>
          <Button type='submit' disabled={creatingLoading}>
            {
              creatingLoading
              ? 'Создание...'
              : 'Создать'
            }
          </Button>
        </div>
      </form>
    </Modal>
  )
}



interface Props {
  projectId: Project['_id']
}

export const CreateTaskButton = ({ projectId }: Props) => {
  const [ opened, { open, close } ] = useDisclosure()


  return (
    <>
      <Button onClick={open} className={classes.deleteButton} variant='filled'>
        Добавить задачу
      </Button>
      <CreateTaskModal opened={opened} close={close} projectId={projectId} />
    </>
  )
}