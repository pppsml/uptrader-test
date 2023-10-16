import { Card } from '@/shared/ui';
import { Draggable, Droppable } from 'react-beautiful-dnd'

import { TaskColumn } from "../model"
import { TaskCard } from './TaskCard';


interface Props {
  col: TaskColumn;
  isDragDisabled: boolean;
}

export const TaskStatusColumn = ({ col: { list, id }, isDragDisabled }: Props) => {

  return (
    <Droppable droppableId={id}>
      {provided => (
        <div>
          <Card style={{ height: '100%', display: 'flex', flexDirection: 'column', overflowY: 'auto' }} {...provided.droppableProps} ref={provided.innerRef}>
            <h3 style={{ textAlign: 'center', marginBottom: '1rem' }}>{id}</h3>
            {list.map((task, index) => (
              <Draggable key={task._id} isDragDisabled={isDragDisabled} draggableId={task._id.toString()} index={index}>
                {provided => (
                  <TaskCard task={task} ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps} />
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </Card>
        </div>
      )}
    </Droppable>
  )
}