import { InfoCircleOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import React from 'react';

const CreatePlanForm = () => {
  const [form] = Form.useForm();
  return (
    <Form form={form} layout='vertical' requiredMark='optional'>
      <Form.Item label='Title' required tooltip='This is a required field'>
        <Input placeholder='input placeholder' />
      </Form.Item>
      <Form.Item
        label='Start date / End date'
        required
        tooltip={{
          title: 'Tooltip with customize icon',
          icon: <InfoCircleOutlined />,
        }}>
        <Input placeholder='input placeholder' />
      </Form.Item>
      <Form.Item
        label='Description'
        tooltip={{
          title: 'Tooltip with customize icon',
          icon: <InfoCircleOutlined />,
        }}>
        <Input placeholder='input placeholder' />
      </Form.Item>
      <Form.Item>
        <Button
          className='font-sans font-light w-32 h-[38px] rounded-sm'
          type='primary'>
          Create
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreatePlanForm;
