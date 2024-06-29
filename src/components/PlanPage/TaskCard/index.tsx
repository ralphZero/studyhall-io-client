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
  const progress = Math.ceil(task.progress * 100);
  const isCompleted = task.isCompleted || task.progress === 1;

  // card items to show
  const tags = task.labels?.map((tag) => (
    <Tag
      key={tag.label + tag.color}
      bordered={false}
      style={{ borderRadius: '32px', paddingInline: '12px' }}
      color={isCompleted ? '#ffffff40' : tag.color}>
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
            backgroundColor: isCompleted ? '#27ae5f' : 'white',
            boxShadow: '0px 2px 25px 2px rgba(128, 138, 138, 0.28)',
            ...draggableProvided.draggableProps.style,
          }}
          size='small'
          bordered={false}
          className='w-full bg-white px-0 mb-4 cursor-pointer'>
          <div className='flex flex-col gap-4'>
            {!!task.labels && <div className='flex gap-[2px]'>{tags}</div>}
            <div
              className={`text-base ${
                isCompleted ? 'text-white' : 'text-primaryBlack'
              }`}>
              {task.title}
            </div>
            {progress > 0 && (
              <Progress
                percent={progress}
                size='small'
                strokeColor={isCompleted ? '#FFFFFF' : '#27ae5f'}
                showInfo={isCompleted ? false : true}
              />
            )}
          </div>
        </Card>
      )}
    </Draggable>
  );
};

export default TaskCard;
