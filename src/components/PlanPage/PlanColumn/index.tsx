import React from 'react';
import { Droppable } from 'react-beautiful-dnd';

interface IPlanColumn {
  weekday: number;
}

const PlanColumn = (props: IPlanColumn) => {
  const { weekday } = props;
  return (
    <div className='w-100'>
      <div>header</div>
      <Droppable droppableId={weekday.toString()}>
        {() => <div></div>}
      </Droppable>
    </div>
  );
};

export default PlanColumn;
