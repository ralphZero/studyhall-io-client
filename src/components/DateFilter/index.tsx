import React, { useContext } from 'react';
import { DatePicker } from 'antd';
import type { DatePickerProps } from 'antd';
import moment, { Moment } from 'moment';
import { DataFilterContext } from '../../context/DataFilterContext';

type DateFilterProps = {
  onChange?: (value: moment.Moment | null, dateString: string) => void;
  value?: Moment;
  minDate: Moment;
  maxDate: Moment;
};

const DateFilter = ({ value, onChange, minDate, maxDate }: DateFilterProps) => {

  const { isReady } = useContext(DataFilterContext);

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
        onChange={(value, dateString) => console.log(value?.toISOString(), dateString)}
        value={value}
        disabledDate={disabledDate}
        clearIcon={<></>}
        allowClear={false}
      />
    </>
  );
};

export default DateFilter;
