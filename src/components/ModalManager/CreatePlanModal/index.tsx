import { Button, Modal } from 'antd';
import React from 'react';
import ModalTitle from './title';
import CreatePlanForm from './CreatePlanForm';
import ModalDivider from './ModalDivider';

interface CreatePlanModalProps {
  isOpen: boolean;
  handleCancel: () => void;
}

const CreatePlanModal = ({ isOpen, handleCancel }: CreatePlanModalProps) => {
  const handleOk = () => {};

  return (
    <Modal
      style={{ top: 20 }}
      width='600px'
      title={
        <ModalTitle
          title={'Create a study plan'}
          subtitle={
            'Create a personalized study plan that fits your unique style.'
          }
        />
      }
      open={isOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={null}>
      <div className='mt-4'>
        <CreatePlanForm />
      </div>
      <div className='mt-2 mb-4'>
        <ModalDivider />
      </div>
      <ModalTitle
        title={'Create a study plan from your online course'}
        subtitle={
          'Create a plan from a course or playlist from the platforms below'
        }
      />
      <div className='flex gap-5 my-4'>
        <Button
          className='font-sans font-light w-32 h-[38px] rounded-sm bg-black'
          type='primary'>
          Udemy
        </Button>
        <Button
          className='font-sans font-light w-32 h-[38px] rounded-sm'
          type='primary'
          danger>
          YouTube
        </Button>
      </div>
    </Modal>
  );
};

export default CreatePlanModal;
