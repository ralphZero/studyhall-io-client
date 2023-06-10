import { Collapse, CollapseProps } from 'antd';
import React, { CSSProperties, useCallback, useEffect, useMemo } from 'react';
import { ReactComponent as CollapseCaret } from '../../../assets/collapse_caret.svg';
import './CollapseGroup.css';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { Plan } from '../../../models/v2/plan';
import { getWeeksInRange } from '../../../utils/weeks-builder';
import { log } from 'console';
import { WeekObject } from '../../../utils/weeks-builder';

interface IPlanBoard {
  plan: Plan;
}

const PlanBoard = (props: IPlanBoard) => {
  const { plan } = props;

  const panelStyle = useMemo(
    () => ({
      marginBottom: 24,
      background: 'white',
      borderRadius: 16,
      border: 'none',
    }),
    []
  );

  const onDragEnd = (result: DropResult) => {};

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
        label: week.formattedDateRange,
        children: <p>{[...week.dates]}</p>,
        style: panelStyle,
      }));
    }
  }, [panelStyle, weeksData]);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <main className='grow mx-6 pt-2'>
        <Collapse
          className='bg-transparent'
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
