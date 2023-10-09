import React from 'react';
import { ModalProps } from '..';
import { Button, Modal } from 'antd';
import { ModalType } from '../../../features/ui/ModalTypes/ModalTypes';
import ModalTitle from '../CreatePlanModal/title';

const DeletePlanModal = ({ isOpen, handleCancel }: ModalProps) => {
  const confirmDeletion = () => {
    // deletion logic
  };

  const closeOrCancelModal = () => {
    handleCancel(ModalType.DELETE_PLAN);
  };

  return (
    <Modal
      title={
        <ModalTitle
          title='Wait a minute!'
          subtitle={'Deleting this plan is permanent.'}
        />
      }
      open={isOpen}
      onOk={confirmDeletion}
      onCancel={closeOrCancelModal}
      footer={[
        <Button onClick={closeOrCancelModal}>Cancel</Button>,
        <Button type='primary' danger onClick={confirmDeletion}>
          Delete
        </Button>,
      ]}>
      <div className='mt-4 text-base font-normal'>
        <p>Are you absolutely sure you want to proceed?</p>
      </div>
    </Modal>
  );
};

export default DeletePlanModal;
