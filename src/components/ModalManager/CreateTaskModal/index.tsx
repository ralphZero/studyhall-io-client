import { Button, ConfigProvider, Modal, theme } from 'antd';
import React from 'react';
import ModalTitle from '../shared/title';
import { ModalProps } from '..';
import { ModalType } from '../../../features/ui/ModalTypes/ModalTypes';
import CreateTaskForm from './CreateTaskForm';

const CreateTaskModal = ({ isOpen, handleCancel }: ModalProps) => {
  const footer = (
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
      <Button className='bg-accent-primary font-sans w-28' type='primary'>
        Create
      </Button>
    </div>
  );
  return (
    <>
      <Modal
        className='min-w-[954px]'
        style={{ top: 20 }}
        title={
          <ModalTitle
            title='Add a topic'
            subtitle='Create a personalized study plan that fits your unique style.'
          />
        }
        open={isOpen}
        onCancel={() => handleCancel(ModalType.CREATE_TASK)}
        footer={footer}>
        <div className='mt-4 flex'>
          <CreateTaskForm />
        </div>
      </Modal>
    </>
  );
};

export default CreateTaskModal;
