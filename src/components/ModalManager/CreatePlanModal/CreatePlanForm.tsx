import React from 'react';
import { InfoCircleOutlined } from '@ant-design/icons';
import { Button, Form, Input, DatePicker } from 'antd';
import { Moment } from 'moment';

export interface Values {
  title: string;
  description: string;
  timeframe: Moment[];
}

interface CreatePlanFormProps {
  onCreate: (values: Values) => void;
}

const CreatePlanForm = ({ onCreate }: CreatePlanFormProps) => {
  const [form] = Form.useForm();

  const onFinish = () => {
    form
      .validateFields()
      .then((values: Values) => {
        onCreate(values);
        form.resetFields();
      })
      .catch((info) => console.error('validate failed', info));
  };

  const { RangePicker } = DatePicker;

  const titleConfig = {
    rules: [
      {
        type: 'string' as const,
        required: true,
        message: 'Please give your plan a title.',
      },
    ],
  };

  const rangeConfig = {
    rules: [
      {
        type: 'array' as const,
        required: true,
        message: 'Please select a timeframe!',
      },
    ],
  };

  return (
    <Form
      form={form}
      onFinish={onFinish}
      layout='vertical'
      requiredMark='optional'>
      {/* Title */}
      <Form.Item
        label='Title'
        name='title'
        required
        tooltip='Give your new plan an awesome title'
        {...titleConfig}>
        <Input placeholder='Ex: Docker 101' />
      </Form.Item>
      {/* Timeframe picker */}
      <Form.Item
        required
        name='timeframe'
        tooltip='Select the duration of your plan.'
        label='Timeframe'
        {...rangeConfig}>
        <RangePicker format='YYYY-MM-DD' />
      </Form.Item>
      {/* Description */}
      <Form.Item
        label='Description'
        name='description'
        tooltip={{
          title: 'Write a nice description',
          icon: <InfoCircleOutlined />,
        }}>
        <Input placeholder='Ex: Learning Docker this week' />
      </Form.Item>
      <Form.Item>
        <Button
          htmlType='submit'
          className='font-sans font-light w-32 h-[38px] rounded-sm'
          type='primary'>
          Create
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreatePlanForm;
