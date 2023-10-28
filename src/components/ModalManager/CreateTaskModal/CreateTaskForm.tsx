import { Col, Input, Row } from 'antd';
import React from 'react';
import PriorityControl from './PriorityControl';
import DeadlineControl from './DeadlineControl';
import LabelControl from './LabelControl';

const CreateTaskForm = () => {
  const handlePrioritySelection = (selectedKey: string) => {
    console.log(selectedKey);
  };

  const handleDeadlineSelection = (timestamp: number) => {
    console.log(timestamp);
  };

  return (
    <>
      <Input
        className='font-sans font-bold text-lg tracking-tight'
        placeholder='Your topic title'
        bordered={false}
      />
      <div className='flex flex-col gap-4 mt-6'>
        <Row>
          <Col className='flex items-center' span={4}>
            <span className='text-general text-sm text-right'>Priority</span>
          </Col>
          <Col className='flex items-center'>
            <PriorityControl onChange={handlePrioritySelection} />
          </Col>
        </Row>
        <Row>
          <Col className='flex items-center' span={4}>
            <span className='text-general text-sm'>Deadline</span>
          </Col>
          <Col className='flex items-center'>
            <DeadlineControl onDateChange={handleDeadlineSelection} />
          </Col>
        </Row>
        <Row>
          <Col className='flex items-center' span={4}>
            <span className='text-general text-sm'>Labels</span>
          </Col>
          <Col className='flex items-center'>
            <LabelControl />
          </Col>
        </Row>
      </div>
    </>
  );
};

export default CreateTaskForm;
