import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import PlanColumnHeader from './PlanColumnHeader';
import moment from 'moment';
import TaskCard from '../TaskCard';
import { Task } from '../../../models/v2/task';

interface IPlanColumn {
  weekday: number;
  tasks: Task[];
}

const PlanColumn = (props: IPlanColumn) => {
  const { weekday, tasks } = props;
  const formattedDate = moment(weekday).format('ddd, MMM D');
  const taskCount = tasks?.length ?? 0;

  return (
    <div className='mt-2 w-[272px] flex-none flex flex-col relative'>
      <PlanColumnHeader
        headerText={formattedDate}
        taskCount={taskCount}
        currentColumnId={weekday.toString()}
      />
      <Droppable droppableId={weekday.toString()}>
        {(droppableProvided, snapshot) => (
          <div
            id='boardContainer'
            ref={droppableProvided.innerRef}
            {...droppableProvided.droppableProps}
            style={{
              borderColor: `${snapshot.isDraggingOver ? '#e0e2e9' : '#f6f6f7'}`,
              flexGrow: '1',
              overflowY: 'auto',
              paddingInline: '1rem',
              paddingTop: '1rem',
            }}>
            {tasks.map((task, index) => (
              <TaskCard
                task={task}
                key={index}
                weekday={weekday}
                index={index}
              />
            ))}
            {droppableProvided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default PlanColumn;
