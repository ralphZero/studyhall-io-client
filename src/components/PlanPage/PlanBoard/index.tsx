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
import { Task } from '../../../models/v2/task';

interface IPlanBoard {
  plan: Plan;
}

const PlanBoard = (props: IPlanBoard) => {
  const { plan } = props;

  const { data: tasks, isLoading } = useGetTasksQuery(plan._id);

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
  };

  const weeksData: WeekObject[] | undefined = useMemo(() => {
    if (plan) {
      const { startTimestamp, endTimestamp } = plan;
      const parsedStartTimestamp = parseInt(startTimestamp);
      const parsedEndTimestamp = parseInt(endTimestamp);
      return getWeeksInRange(parsedStartTimestamp, parsedEndTimestamp);
    }
  }, [plan]);

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
          />
        ),
        style: panelStyle,
      }));
    }
  }, [panelStyle, tasks, weeksData]);

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
