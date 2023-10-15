import { PlusOutlined } from '@ant-design/icons';
import { Badge, Button, Tooltip } from 'antd';
import React from 'react';
import { useDispatch } from 'react-redux';
import { updateActiveModal } from '../../../features/ui/globalUiSlice';
import { ModalType } from '../../../features/ui/ModalTypes/ModalTypes';

interface IPlanColumnHeader {
  headerText: string;
  taskCount: number;
}

const PlanColumnHeader = (props: IPlanColumnHeader) => {
  const { headerText, taskCount = 0 } = props;
  const dispatch = useDispatch();

  const handleOpenModal = () => {
    dispatch(updateActiveModal({ status: true, tag: ModalType.CREATE_TASK }));
  };

  return (
    <div className='px-2 mb-2 mx-4 py-1 bg-accent-primary text-white font-sans text-xs rounded-lg'>
      <div className='flex items-center justify-between'>
        <div>{headerText}</div>
        <div className='flex gap-2 items-center'>
          <Badge
            showZero
            color='white'
            style={{ color: '#2E86FA', fontWeight: '600' }}
            count={taskCount}
            overflowCount={50}
          />
          <Tooltip title='Add a task'>
            <Button
              onClick={handleOpenModal}
              type='text'
              size='small'
              shape='circle'
              style={{ color: 'white' }}
              icon={<PlusOutlined />}
            />
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default PlanColumnHeader;
