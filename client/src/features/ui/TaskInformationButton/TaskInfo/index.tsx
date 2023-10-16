import { useEffect, useState } from 'react'

import { Task } from '@/entities/task'
import { FileLink } from '@/entities/file'
import { formatDate, useAppDispatch, useAppSelector } from '@/shared/lib'
import classes from '../TaskModal.module.css'
import { Subtask } from './Subtask'
import { Input } from '@/shared/ui'
import { TbPlus } from 'react-icons/tb'
import { createSubtaskACtion } from '@/entities/task/model/actions'

interface Props {
  task: Task
}

export const TaskInfo = ({ task }:Props) => {
  const {
    title,
    status,
    createdAt,
    completedAt,
    devTime,
    devTimeAt,
    priority,
    files,
    
    description,
    subtasks,

    comments,
  } = task

  const createdAtString = `${createdAt.toString().slice(0, 10)} ${createdAt.toString().slice(11, 19)}`

  const deadlineDate = completedAt ? new Date(completedAt) : null
  const deadline = deadlineDate ? formatDate(deadlineDate) : 'Без срока'

  const createSubtaskLoading = useAppSelector(({ tasks }) => tasks.createSubtaskLoading)
  const dispatch = useAppDispatch()
  const [ subtaskName, setSubtaskName ] = useState('')
  const [ devTimeString, setDevTime ] = useState<string>('')

  useEffect(() => {
    let interval: number | null = null

    const formatNumber = (number: number):string => {
      return number > 9 ? number.toString() : '0' + number
    }

    if (status === 'dev') {
      interval = setInterval(() => {
        const timeDifference = Math.floor((Date.now() - devTimeAt!) / 1000)
        const hours = formatNumber(Math.floor(timeDifference / 3600))
        const minutes = formatNumber(Math.floor((timeDifference % 3600) / 60))
        const seconds = formatNumber(Math.floor((timeDifference % 3600) % 60))
        setDevTime(`${hours}:${minutes}:${seconds}`)
      }, 1000)
    } else {
        const hours = formatNumber(Math.floor(devTime / 3600))
        const minutes = formatNumber(Math.floor((devTime % 3600) / 60))
        const seconds = formatNumber(Math.floor((devTime % 3600) % 60))
      setDevTime(`${hours}:${minutes}:${seconds}`)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [])



  const createSubtaskHandler = () => {
    dispatch(createSubtaskACtion({ taskId: task._id, text: subtaskName }))
  }
  
  return (
    <div className={classes.cols__container}>
    <div className={classes.cols__item}>

      {/* <div>
        <p className={classes.text_label}>Заголовок:</p>
        <p className={classes.text}>{title}</p>
      </div> */}

      <div>
        <p className={classes.text_label}>Статус:</p>
        <p className={classes.text}>{status}</p>
      </div>
      
      <div>
        <p className={classes.text_label}>Создан:</p>
        <p className={classes.text}>{createdAtString}</p>
      </div>

      <div>
        <p className={classes.text_label}>Deadline:</p>
        <p className={classes.text}>{deadline}</p>
      </div>

      <div>
        <p className={classes.text_label}>Приоритет:</p>
        <p className={classes.text}>{priority}</p>
      </div>

      <div>
        <p className={classes.text_label}>Время в разработке:</p>
        <p className={classes.text}>{devTimeString}</p>
      </div>


      <div>
        <p className={classes.text_label}>Прикрепленные файлы:</p>
        {files.length > 0 && files.map(file => (
          <FileLink key={file._id} file={file} />
        ))}
        {files.length === 0 && <p>Файлов нет</p>}
      </div>
    </div>

    <div className={classes.cols__item}>
      <div>
        <p className={classes.text_label}>Описание:</p>
        <pre>{description}</pre>
      </div>

      <div>
        <p className={classes.text_label}>Подзадачи:</p>
          {subtasks.map(subtask => (
            <Subtask taskId={task._id} subtask={subtask} key={subtask.id} />
          ))}
          <div style={{ display: 'flex', alignItems: 'center', }}>
            <Input name='subtaskName' value={subtaskName} onChange={e=> setSubtaskName(e.target.value)} />
            <button disabled={createSubtaskLoading} title='добавить задачу' onClick={createSubtaskHandler}><TbPlus size='1rem' /></button>
          </div>
      </div>
    </div>

    <div className={classes.cols__item}>
      <div>
        <p className={classes.text_label}>Комментарии:</p>
        <p>{132}</p>
      </div>
    </div>

  </div>
  )
}