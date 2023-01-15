import React from 'react';
import { DatePicker } from 'antd';
import type { DatePickerProps } from 'antd';
import moment, { Moment } from 'moment';

type DateFilterProps = {
  onChange: (value: moment.Moment | null, dateString: string) => void;
  value?: Moment;
  minDate: Moment;
  maxDate: Moment;
  isReady: boolean;
};

const DateFilter = ({ value, onChange, minDate, maxDate, isReady }: DateFilterProps) => {

  const weekFormat = 'MMM DD, yyyy';
  const customWeekStartEndFormat: DatePickerProps['format'] = (value) =>
    `${moment(value).startOf('week').format(weekFormat)} ~ ${moment(value)
      .endOf('week')
      .format(weekFormat)}`;

  const disabledDate = (current: Moment) => {
    return current && !current.isBetween(minDate, maxDate, 'week', '[]')
  }

  return (
    <>
      <DatePicker
        style={{ height: '32px' }}
        size='small'
        picker='week'
        format={customWeekStartEndFormat}
        className='mr-5'
        bordered={false}
        disabled={!isReady}
        placeholder={isReady ? 'Select week' : 'Loading...'}
        onChange={onChange}
        value={value}
        disabledDate={disabledDate}
        clearIcon={null}
        allowClear={false}
      />
    </>
  );
};

export default DateFilter;
