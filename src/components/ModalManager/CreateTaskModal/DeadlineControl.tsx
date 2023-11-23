import React from 'react';
import { ConfigProvider, DatePicker } from 'antd';
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
      <ConfigProvider
        theme={{
          components: {
            DatePicker: { fontSize: 12, paddingBlock: 0, paddingInline: 0 },
          },
        }}>
        <DatePicker
          size='small'
          defaultValue={dayjs(initialValue ?? new Date())}
          bordered={true}
          format={dateFormat}
          onChange={handleDataChange}
          placeholder={dayjs(new Date()).format(dateFormat)}
        />
      </ConfigProvider>
    </>
  );
};

export default DeadlineControl;
