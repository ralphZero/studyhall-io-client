import React, { useCallback } from 'react';
import PlanColumn from '../PlanColumn';
import { Task } from '../../../models/v2/task';
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
        let taskIds: string | string[] = [];
        if (taskIdObj && Object.keys(taskIdObj).length) {
          taskIds = taskIdObj[weekday.toString()] ?? [];
        }

        const thisWeeksTasks = tasks
          .filter((task) => {
            // const parsedTaskTimestamp = Number(tasks.timestamp);
            const taskId = task._id as string;

            return taskIds?.includes(taskId);
          })
          .sort(
            (a, b) =>
              taskIds.indexOf(a._id as string) -
              taskIds.indexOf(b?._id as string)
          );

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
