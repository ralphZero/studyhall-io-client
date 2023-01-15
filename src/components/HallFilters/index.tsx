import React, { useContext } from 'react';
import { FilterOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import DateFilter from '../DateFilter';
import FilterGroup from '../FilterGroup';
import { DataFilterContext } from '../../context/DataFilterContext';
import moment, { Moment } from 'moment';

const HallFilters = () => {
  const { isReady, dateFilter, changeDateFilter } = useContext(DataFilterContext);

  const currentDay = isReady ? moment(dateFilter?.currentWeek[0]) : undefined;
  const handleOnDateChanged = (value: moment.Moment | null, dateString: string) => {
    value && changeDateFilter(value);
  }

  return (
    <FilterGroup>
      <DateFilter
        value={currentDay}
        minDate={dateFilter?.minDate as Moment}
        maxDate={dateFilter?.maxDate as Moment}
        isReady={isReady}
        onChange={handleOnDateChanged}
      />
      <Button size='middle' icon={<FilterOutlined />}>
        Filter
      </Button>
    </FilterGroup>
  );
};

export default HallFilters;
