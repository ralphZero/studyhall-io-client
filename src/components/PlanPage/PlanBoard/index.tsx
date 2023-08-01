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
      let start = null;
      let end = null;

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

      console.log('start', start);
      console.log('end', end);
      console.log('source', source.index);
      console.log('destination', destination.index);
      console.log('draggableId', draggableId);

      if (start === end) {
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
