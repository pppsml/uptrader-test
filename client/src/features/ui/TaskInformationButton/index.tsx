

import { Task } from '@/entities/task'
import { deleteTaskAction } from '@/entities/task/model/actions';
import { formatDate, useAppDispatch, useAppSelector, useDisclosure } from '@/shared/lib'
import { Button, Modal, ModalProps } from '@/shared/ui'
import { useEffect, useState } from 'react';
import { TbPencil, TbTrash } from 'react-icons/tb';
import { useParams } from 'react-router-dom';
import { TaskInfo } from './TaskInfo';

import classes from './TaskModal.module.css'

interface TaskInformationModalProps extends Omit<ModalProps, 'bottomContent' | 'title'> {
  task: Task;
}

const TaskInformationModal = ({ opened, close, task }: TaskInformationModalProps) => {
  const {
    title,
  } = task

  // левая title status createdAt deadline(completedAt) priority devTime files
  // центр descr subtasks 
  // правая comments
  const deletingLoading = useAppSelector(({ tasks }) => tasks.deletingLoading)
  const { projectId } = useParams()
  const dispatch = useAppDispatch()

  const deleteTaskHandler = () => {
    dispatch(deleteTaskAction({ taskId: task._id, projectId: projectId! }))
  }

  return (
    <Modal
    title={`Задача: ${title}`}
    bottomContent={<div className={classes.bottomButtons}>
      <Button
      disabled={deletingLoading}
      onClick={deleteTaskHandler}
      className={classes.deleteButton}>
        {
        deletingLoading
        ? 'Удаление...'
        : <>Удалить <TbTrash style={{ marginLeft: '.2rem' }} size='1rem' /></>
        }
      </Button>
      <Button disabled={deletingLoading}>Изменить <TbPencil style={{ marginLeft: '.2rem' }} size='1rem' /></Button>
    </div>}
    opened={opened}
    close={close}>
      <TaskInfo task={task} />
    </Modal>
  )
}

export const TaskInformationButton = ({ task }: { task: Task }) => {
  const [ opened, { open, close } ] = useDisclosure()

  return (
    <>
      <Button onClick={open}>Подробнее</Button>
      <TaskInformationModal opened={opened} close={close} task={task} />
    </>
  )
}