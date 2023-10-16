import { useEffect, useState } from "react"
import { useParams } from 'react-router-dom'
import { DragDropContext } from 'react-beautiful-dnd'

import { fetchTasksAction,  } from "@/entities/task"
import { useAppDispatch, useAppSelector } from "@/shared/lib"
import { CreateTaskButton } from '@/features/ui'
import { useDrag } from "../lib"
import { RootTaskColumns } from "../model"
import { TaskStatusColumn } from "./TaskStatusColumn"


export const TaskList = () => {
  const { tasks, projectName, loading, error, changingTaskStatusLoading } = useAppSelector(({ tasks }) => tasks )
  const { projectId } = useParams()

  if (!projectId) {
    return (
      <>
        no projectId
      </>
    )
  }

  const dispatch = useAppDispatch()
  const [ filteredTasks, setFilteredTasks ] = useState<RootTaskColumns>({})

  // todo add sort: proirity, deadline, title

  useEffect(() => {
    setFilteredTasks({
      queue: {
        id: 'queue',
        list: tasks.filter(task => task.status === 'queue'),
      },
      dev: {
        id: 'dev',
        list: tasks.filter(task => task.status === 'dev'),
      },
      done: {
        id: 'done',
        list: tasks.filter(task => task.status === 'done'),
      },
    })
  }, [tasks])

  const { onDragEnd } = useDrag(filteredTasks, setFilteredTasks, dispatch)

  const fetchTasksHandler = () => {
    dispatch(fetchTasksAction(projectId))
  }

  useEffect(() => {
    fetchTasksHandler()
  }, [projectId])

  return (
    <>
    <h2 style={{ textAlign: 'center' }}>Проект: {projectName}</h2>
      <CreateTaskButton projectId={projectId} />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridTemplateRows: '500px', alignItems: 'stretch' }}>
        <DragDropContext onDragEnd={onDragEnd}>
          {Object.values(filteredTasks).map(col => (
            <TaskStatusColumn isDragDisabled={changingTaskStatusLoading} col={col} key={col.id} />
          ))}
        </DragDropContext>
      </div>
      {loading && <p>Загрузка...</p>}
      {error && <p style={{ color: 'red' }}>Не удалось загрузить список задач: {error}</p>}
    </>
  )
}