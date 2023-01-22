import React from 'react';
import { FilterOutlined } from '@ant-design/icons';
import { Button, Popover, Space } from 'antd';
// import DateFilter from '../DateFilter';
import FilterGroup from '../FilterGroup';
// import { DataFilterContext } from '../../context/DataFilterContext';
// import moment, { Moment } from 'moment';

const HallFilters = () => {
  // const { isReady, dateFilter, changeDateFilter } =
  //   useContext(DataFilterContext);

  // const currentDay = isReady ? moment(dateFilter?.currentWeek[0]) : undefined;
  // const handleOnDateChanged = (
  //   value: moment.Moment | null,
  //   dateString: string
  // ) => {
  //   value && changeDateFilter(value);
  // };

  const content = <Space className='p-3 w-72'>🚧🦺🚧 -Under construction- 🚧🦺🚧</Space>;

  return (
    <FilterGroup>
      <Popover trigger='click' content={content} placement='bottomRight'>
        <Button size='middle' icon={<FilterOutlined />}>
          Filter
        </Button>
      </Popover>
    </FilterGroup>
  );
};

export default HallFilters;
