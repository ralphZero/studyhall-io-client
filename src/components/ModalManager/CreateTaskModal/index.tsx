import { Button, ConfigProvider, Modal, theme } from 'antd';
import React from 'react';
import ModalTitle from '../shared/title';
import { ModalProps } from '..';
import { ModalType } from '../../../features/ui/ModalTypes/ModalTypes';
import CreateTaskForm from './CreateTaskForm';

const CreateTaskModal = ({ isOpen, handleCancel }: ModalProps) => {
  return (
    <>
      <Modal
        className='min-w-[954px]'
        style={{ top: 20 }}
        title={
          <ModalTitle
            title='Add a task'
            subtitle='Create a personalized study plan that fits your unique style.'
          />
        }
        open={isOpen}
        onCancel={() => handleCancel(ModalType.CREATE_TASK)}
        footer={null}>
        <div className='mt-4 flex'>
          <CreateTaskForm />
        </div>
      </Modal>
    </>
  );
};

export default CreateTaskModal;
