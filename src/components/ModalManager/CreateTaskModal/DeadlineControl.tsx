import React from 'react';
import { ConfigProvider, DatePicker } from 'antd';
import dayjs from 'dayjs';

export interface DeadlineControlProps {
  value?: string;
  onChange?: (timestamp: string) => void;
}

const DeadlineControl = (props: DeadlineControlProps) => {
  const { value = Date.now().toString(), onChange } = props;
  const dateFormat = 'ddd, D MMM YYYY';

  const handleDataChange = (value: dayjs.Dayjs | null, dateString: string) => {
    if (value) {
      onChange?.(value?.toDate()?.getTime().toString());
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
          defaultValue={dayjs(value ?? new Date())}
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
