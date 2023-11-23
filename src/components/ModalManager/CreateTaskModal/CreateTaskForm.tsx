import React from 'react';
import { Col, Input, Row, Space } from 'antd';
import PriorityControl from './PriorityControl';
import DeadlineControl from './DeadlineControl';
import LabelControl from './LabelControl';
import { DescriptionEditor } from './DescriptionEditor';
import SubtaskControl from './SubtaskControl';

const CreateTaskForm = () => {
  const handlePrioritySelection = (selectedKey: string) => {
    console.log(selectedKey);
  };

  const handleDeadlineSelection = (timestamp: number) => {
    console.log(timestamp);
  };

  return (
    <>
      <div className='flex-grow pr-4 border-0 border-r border-solid border-dividerDark'>
        <Input
          className='font-sans font-bold text-lg tracking-tight'
          placeholder='Your topic title'
          bordered={false}
        />
        <div className='mt-8'>
          <div className='text-general text-sm'>Description</div>
          <DescriptionEditor />
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
            <PriorityControl onChange={handlePrioritySelection} />
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
    </>
  );
};

export default CreateTaskForm;
