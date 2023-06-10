import React, { useCallback } from 'react';
import PlanColumn from '../PlanColumn';

interface IPlanColumnGroup {
  weekdays: number[];
}

const PlanColumnGroup = (props: IPlanColumnGroup) => {
  const { weekdays } = props;
  const buildColumn = useCallback(() => {
    if (weekdays) {
      return weekdays.map((weekday, index) => {
        return <PlanColumn key={index} weekday={weekday} />;
      });
    }
  }, [weekdays]);

  return (
    <div className='w-full flex gap-6 grow h-[600px] overflow-x-auto'>
      {buildColumn()}
    </div>
  );
};

export default PlanColumnGroup;
