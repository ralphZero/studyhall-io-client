import { Card, Progress, Tag } from 'antd';
import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

interface ITaskCard {
  index: number;
  weekday: number;
}
const TaskCard = (props: ITaskCard) => {
  const { index, weekday } = props;
  const draggableId = weekday + '_' + index;
  return (
    <Draggable draggableId={draggableId} index={index}>
      {(draggableProvided, snapshot) => (
        <Card
          {...draggableProvided.draggableProps}
          {...draggableProvided.dragHandleProps}
          ref={draggableProvided.innerRef}
          style={{
            boxShadow: '0px 2px 25px 2px rgba(128, 138, 138, 0.28)',
            ...draggableProvided.draggableProps.style,
          }}
          size='small'
          bordered={false}
          className='w-full bg-white px-0 mb-4'>
          <div className='flex flex-col gap-4'>
            <div className='flex gap-[2px]'>
              <Tag bordered={false} color='processing'>
                Concept
              </Tag>
              <Tag bordered={false} color='warning'>
                Concept
              </Tag>
            </div>
            <div className='text-base text-primaryBlack'>
              Add what you'd like to work on here
            </div>
            <Progress percent={100} size='small' />
          </div>
        </Card>
      )}
    </Draggable>
  );
};

export default TaskCard;
