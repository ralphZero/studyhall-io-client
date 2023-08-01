import React, { useCallback } from 'react';
import PlanColumn from '../PlanColumn';
import { Task } from '../../../models/v2/task';
import { areTimestampsSameDay } from '../../../utils/samedaycheck';
import { TaskIdObj } from '../../../models/v2/taskIdObj';

interface IPlanColumnGroup {
  weekdays: number[];
  tasks: Task[] | undefined;
  isLoading: boolean;
  taskIdObj: TaskIdObj;
}

const PlanColumnGroup = (props: IPlanColumnGroup) => {
  const { weekdays, tasks, taskIdObj } = props;

  const buildColumn = useCallback(() => {
    if (weekdays && !!tasks) {
      return weekdays.map((weekday, index) => {
        const taskIds = taskIdObj[weekday.toString()] ?? [];

        const thisWeeksTasks = tasks.filter((tasks) => {
          // const parsedTaskTimestamp = Number(tasks.timestamp);
          const taskId = tasks._id as string;

          return taskIds?.includes(taskId);
        });

        return (
          <PlanColumn key={index} tasks={thisWeeksTasks} weekday={weekday} />
        );
      });
    }
  }, [taskIdObj, tasks, weekdays]);

  return (
    <div className='w-full flex grow h-[600px] overflow-hidden overflow-x-auto'>
      {buildColumn()}
    </div>
  );
};

export default PlanColumnGroup;
