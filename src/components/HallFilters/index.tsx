import React, { useContext } from 'react';
import { FilterOutlined } from '@ant-design/icons';
import { Button, Card, Divider, Popover, Switch } from 'antd';
import DateFilter from '../DateFilter';
import FilterGroup from '../FilterGroup';
import { DataFilterContext } from '../../context/DataFilterContext';
import moment, { Moment } from 'moment';

const HallFilters = () => {
  const { isReady, dateFilter, changeDateFilter } =
    useContext(DataFilterContext);

  const currentDay = isReady ? moment(dateFilter?.currentWeek[0]) : undefined;
  const handleOnDateChanged = (
    value: moment.Moment | null,
    dateString: string
  ) => {
    value && changeDateFilter(value);
  };

  const content = (
    <Card title='Apply filter' bordered={false} style={{ width: 300 }}>
      <Switch
        checkedChildren='By week'
        unCheckedChildren='All'
        defaultChecked
      />
      <DateFilter
        value={currentDay}
        minDate={dateFilter?.minDate as Moment}
        maxDate={dateFilter?.maxDate as Moment}
        isReady={isReady}
        onChange={handleOnDateChanged}
      />
      <Divider />
      <p>WIP</p>
    </Card>
  );

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
