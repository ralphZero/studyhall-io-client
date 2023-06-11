import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import PlanColumnHeader from './PlanColumnHeader';
import moment from 'moment';
import TaskCard from '../TaskCard';

interface IPlanColumn {
  weekday: number;
}

const PlanColumn = (props: IPlanColumn) => {
  const { weekday } = props;
  const formattedDate = moment(weekday).format('ddd, MMM D');

  return (
    <div className='mt-2 mx-4 w-[272px] flex-none flex flex-col relative'>
      <PlanColumnHeader headerText={formattedDate} />
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
            }}>
            {Array(6)
              .fill('')
              .map((_, index) => (
                <TaskCard key={index} weekday={weekday} index={index} />
              ))}
            {droppableProvided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default PlanColumn;
