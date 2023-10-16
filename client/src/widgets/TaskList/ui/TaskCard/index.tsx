import { forwardRef, HTMLAttributes } from "react"

import { Task } from "@/entities/task"
import { TaskInformationButton } from "@/features/ui"
import { Card } from "@/shared/ui"

import classes from './TaskCard.module.css'

interface Props extends HTMLAttributes<HTMLDivElement> {
  task: Task
}

export const TaskCard = forwardRef<HTMLDivElement, Props>(({ task, ...props }: Props, ref) => {

  const createdAt = `${task.createdAt.toString().slice(0, 10)} ${task.createdAt.toString().slice(11, 19)}`

  return (
    <Card className={classes.taskcard} ref={ref} {...props}>
      <p style={{ fontWeight: '500' }}>{task.title}</p>
      <p>Приоритет: {task.priority}</p>
      <p>Создан: {createdAt}</p>
      <div className={classes.buttons}>
        <TaskInformationButton task={task} />
      </div>
    </Card>
  )
})