import { memo, useId } from "react"
import { TbX } from "react-icons/tb"

import { Subtask as SubtaskType, Task } from "@/entities/task"
import { useAppDispatch, useAppSelector } from "@/shared/lib"
import { deleteSubtaskACtion, toggleSubtaskACtion } from "@/entities/task/model/actions"

interface Props {
  subtask: SubtaskType
  taskId: Task['_id']
}

export const Subtask = memo(({ subtask: { id, isCompleted, text }, taskId }: Props) => {
  const inputId = useId()
  const dispatch = useAppDispatch()
  const { deleteSubtaskLoading, toggleSubtaskLoading } = useAppSelector(({ tasks }) => tasks)

  const toggleSubtaskHandler = () => {
    dispatch(toggleSubtaskACtion({ taskId, subtaskId: id }))
  }

  const deleteSubtaskHandler = () => {
    dispatch(deleteSubtaskACtion({ taskId, subtaskId: id }))
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '.3rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '.3rem' }}>
        <input
          onChange={toggleSubtaskHandler}
          disabled={toggleSubtaskLoading}
          id={inputId}
          checked={isCompleted}
          type='checkbox'
        />
        <label
          style={{ textDecoration: isCompleted ? 'line-through' : 'none' }}
          htmlFor={inputId}
        >
          {text}
        </label>
      </div>
      <button onClick={deleteSubtaskHandler} disabled={deleteSubtaskLoading}><TbX size='1rem' color="red" /></button>
    </div>
  )
})