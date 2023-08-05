import { Collapse } from 'antd';
import React, { useCallback, useMemo } from 'react';
import { ReactComponent as CollapseCaret } from '../../../assets/collapse_caret.svg';
import './CollapseGroup.css';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { Plan } from '../../../models/v2/plan';
import { getWeeksInRange } from '../../../utils/weeks-builder';
import { WeekObject } from '../../../utils/weeks-builder';
import PlanColumnGroup from '../PlanColumnGroup';
import { useGetTasksQuery } from '../../../features/api/plans/taskApi';

interface IPlanBoard {
  plan: Plan;
}

const PlanBoard = (props: IPlanBoard) => {
  const { plan } = props;
  const { taskIdObj } = plan;

  const { data: tasks, isLoading } = useGetTasksQuery(plan._id);

  const weeksData: WeekObject[] | undefined = useMemo(() => {
    if (plan) {
      const { startTimestamp, endTimestamp } = plan;
      const parsedStartTimestamp = parseInt(startTimestamp);
      const parsedEndTimestamp = parseInt(endTimestamp);
      return getWeeksInRange(parsedStartTimestamp, parsedEndTimestamp);
    }
  }, [plan]);

  const panelStyle = useMemo(
    () => ({
      marginBottom: 24,
      background: 'white',
      borderRadius: 16,
      border: 'none',
    }),
    []
  );

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (weeksData) {
      let start: string = '';
      let end: string = '';

      weeksData.forEach((week) => {
        week.dates.forEach((date) => {
          if (date.toString() === source.droppableId) {
            start = date.toString();
          }
          if (date.toString() === destination.droppableId) {
            end = date.toString();
          }
        });
      });

      if (start === end) {
        // if switch task in same column
        const taskIds = plan.taskIdObj;
        // TODO: add checks - if taskIds for start is undefined
        const newTaskIds = Array.from(taskIds[start]);
        newTaskIds.splice(source.index, 1);
        newTaskIds.splice(destination.index, 0, draggableId);
        plan.taskIdObj[start] = newTaskIds;

        // TODO: rtk query to update taskIds - optimistic update (look this up before proceeding)
      } else {
        // TODO: (below)
        // start id is diff than end id
        // update start column taskIds list
        // update end column taskIds list
        // update droppable timestamp to end id (maybe not)
        // do rtk query batch update
      }
    }
  };

  const buildBoard = useCallback(() => {
    if (weeksData) {
      return weeksData.map((week) => ({
        key: week.startDate,
        label: (
          <span className='w-[205px] inline-block text-primaryBlack'>
            <span className='font-sans font-semibold text-sm pr-2'>Week</span>
            {week.formattedDateRange}
          </span>
        ),
        children: (
          <PlanColumnGroup
            tasks={tasks}
            isLoading={isLoading}
            weekdays={week.dates}
            taskIdObj={taskIdObj}
          />
        ),
        style: panelStyle,
      }));
    }
  }, [isLoading, panelStyle, tasks, weeksData, taskIdObj]);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <main className='grow px-6 pt-2 overflow-auto h-[calc(100vh_-_55px)]'>
        <Collapse
          className='bg-transparent flex flex-col'
          bordered={false}
          defaultActiveKey={['1']}
          expandIconPosition='end'
          expandIcon={({ isActive }) => (
            <span className={isActive ? 'expandIconActive' : 'expandIcon'}>
              <CollapseCaret height={32} width={32} />
            </span>
          )}
          items={buildBoard()}
        />
      </main>
    </DragDropContext>
  );
};

export default PlanBoard;
