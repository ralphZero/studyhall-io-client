import React, { useCallback } from 'react';
import PlanColumn from '../PlanColumn';
import { Task } from '../../../models/v2/task';
import { areTimestampsSameDay } from '../../../utils/samedaycheck';

interface IPlanColumnGroup {
  weekdays: number[];
  tasks: Task[] | undefined;
  isLoading: boolean;
}

const PlanColumnGroup = (props: IPlanColumnGroup) => {
  const { weekdays, tasks, isLoading } = props;

  const buildColumn = useCallback(() => {
    if (weekdays && !!tasks) {
      return weekdays.map((weekday, index) => {
        const thisWeeksTasks = tasks.filter((tasks) => {
          const parsedTaskTimestamp = Number(tasks.timestamp);
          return areTimestampsSameDay(parsedTaskTimestamp, weekday);
        });
        return (
          <PlanColumn key={index} tasks={thisWeeksTasks} weekday={weekday} />
        );
      });
    }
  }, [tasks, weekdays]);

  return (
    <div className='w-full flex grow h-[600px] overflow-hidden overflow-x-auto'>
      {buildColumn()}
    </div>
  );
};

export default PlanColumnGroup;
