import React from 'react';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';

export interface DeadlineControlProps {
  initialValue?: number | string;
  onDateChange: (timestamp: number) => void;
}

const DeadlineControl = (props: DeadlineControlProps) => {
  const { initialValue, onDateChange } = props;
  const dateFormat = 'ddd, D MMM YYYY';

  const handleDataChange = (value: dayjs.Dayjs | null, dateString: string) => {
    if (value) {
      onDateChange(value?.toDate()?.getTime());
    }
  };

  return (
    <>
      <DatePicker
        defaultValue={dayjs(initialValue ?? new Date())}
        bordered={true}
        format={dateFormat}
        onChange={handleDataChange}
        placeholder={dayjs(new Date()).format(dateFormat)}
      />
    </>
  );
};

export default DeadlineControl;
