import { Card, Progress, Tag } from 'antd';
import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Task } from '../../../models/v2/task';

interface ITaskCard {
  index: number;
  weekday: number;
  task: Task;
  onClick: () => void;
}

const TaskCard = (props: ITaskCard) => {
  const { index, onClick, task } = props;
  const draggableId = task._id as string;
  const progress = task.progress * 100;
  // card items to show
  const tags = task.labels?.map((tag) => (
    <Tag key={tag.label + tag.color} bordered={false} color={tag.color}>
      {tag.label}
    </Tag>
  ));
  return (
    <Draggable draggableId={draggableId} index={index}>
      {(draggableProvided, snapshot) => (
        <Card
          {...draggableProvided.draggableProps}
          {...draggableProvided.dragHandleProps}
          ref={draggableProvided.innerRef}
          onClick={onClick}
          style={{
            boxShadow: '0px 2px 25px 2px rgba(128, 138, 138, 0.28)',
            ...draggableProvided.draggableProps.style,
          }}
          size='small'
          bordered={false}
          className='w-full bg-white px-0 mb-4 cursor-pointer'>
          <div className='flex flex-col gap-4'>
            {!!task.labels && <div className='flex gap-[2px]'>{tags}</div>}
            <div className='text-base text-primaryBlack'>{task.title}</div>
            <Progress percent={progress} size='small' />
          </div>
        </Card>
      )}
    </Draggable>
  );
};

export default TaskCard;
