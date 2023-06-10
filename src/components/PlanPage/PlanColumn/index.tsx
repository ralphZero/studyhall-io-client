import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import PlanColumnHeader from './PlanColumnHeader';
import moment from 'moment';

interface IPlanColumn {
  weekday: number;
}

const PlanColumn = (props: IPlanColumn) => {
  const { weekday } = props;
  const formattedDate = moment(weekday).format('ddd, MMM D');

  return (
    <div className='w-100'>
      <PlanColumnHeader headerText={formattedDate} />
      <Droppable droppableId={weekday.toString()}>
        {() => <div></div>}
      </Droppable>
    </div>
  );
};

export default PlanColumn;
