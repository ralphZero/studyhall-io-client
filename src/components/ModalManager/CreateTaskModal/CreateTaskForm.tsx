import React from 'react';
import { Button, Col, ConfigProvider, Form, Input, Row, Space } from 'antd';
import PriorityControl from './PriorityControl';
import DeadlineControl from './DeadlineControl';
import LabelControl from './LabelControl';
import { DescriptionEditor } from './DescriptionEditor';
import SubtaskControl from './SubtaskControl';

const CreateTaskForm = () => {
  const [form] = Form.useForm();
  const handlePrioritySelection = (selectedKey: string) => {
    console.log(selectedKey);
  };

  const handleDeadlineSelection = (timestamp: number) => {
    console.log(timestamp);
  };

  const onFinish = () => {
    form.validateFields().then((formData) => console.log(formData));
  };

  return (
    <Form
      className='flex gap-5 flex-col w-full'
      form={form}
      onFinish={onFinish}>
      <div className='flex border-0 border-b border-solid border-dividerDark'>
        <div className='flex-grow pr-4 border-0 border-r border-solid border-dividerDark'>
          <Form.Item name='title'>
            <Input
              className='font-sans font-bold text-lg tracking-tight'
              placeholder='Your topic title'
              bordered={false}
            />
          </Form.Item>
          <div className='mt-8'>
            <div className='text-general text-sm'>Description</div>
            <Form.Item name='description'>
              <DescriptionEditor />
            </Form.Item>
          </div>
          <div className='mt-8'>
            <div className='text-general text-sm'>Add subtasks</div>
            <SubtaskControl />
          </div>
        </div>

        <div className='w-64 flex flex-col gap-4 pl-4'>
          <Row className='w-full pb-4 border-0 border-b border-solid border-dividerDark'>
            <Col className='flex flex-col gap-2 items-start'>
              <span className='text-general text-sm'>Priority</span>
              <Form.Item name='priority'>
                <PriorityControl />
              </Form.Item>
            </Col>
          </Row>
          <Row className='w-full pb-4 border-0 border-b border-solid border-dividerDark'>
            <Col className='flex flex-col gap-2 items-start'>
              <span className='text-general text-sm'>Deadline</span>
              <DeadlineControl onDateChange={handleDeadlineSelection} />
            </Col>
          </Row>
          <Row className='w-full pb-4 border-0 border-b border-solid border-dividerDark'>
            <Col className='flex flex-col gap-2 items-start'>
              <span className='text-general text-sm'>Labels</span>
              <Space wrap>
                <LabelControl />
              </Space>
            </Col>
          </Row>
        </div>
      </div>
      <div className='flex justify-between'>
        <ConfigProvider
          theme={{
            components: {
              Button: {
                defaultBorderColor: '#27AE60',
                defaultColor: '#27AE60',
                colorPrimary: '#27AE60',
                colorPrimaryActive: '#27AE60',
                colorPrimaryHover: '#FFFFFF',
              },
            },
          }}>
          <Button className='font-sans hover:bg-[#27AE60]'>Mark as done</Button>
        </ConfigProvider>
        <Form.Item>
          <Button
            htmlType='submit'
            className='bg-accent-primary font-sans w-28 m-0'
            type='primary'>
            Create
          </Button>
        </Form.Item>
      </div>
    </Form>
  );
};

export default CreateTaskForm;
