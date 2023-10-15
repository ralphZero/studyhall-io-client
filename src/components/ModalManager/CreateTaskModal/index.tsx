import { Modal } from 'antd';
import React from 'react';
import ModalTitle from '../shared/title';
import { ModalProps } from '..';
import { ModalType } from '../../../features/ui/ModalTypes/ModalTypes';

const CreateTaskModal = ({ isOpen, handleCancel }: ModalProps) => {
  return (
    <>
      <Modal
        style={{ top: 20 }}
        width='600px'
        title={
          <ModalTitle
            title='Add a topic'
            subtitle='Create a personalized study plan that fits your unique style.'
          />
        }
        open={isOpen}
        onCancel={() => handleCancel(ModalType.CREATE_TASK)}>
        <div>test</div>
      </Modal>
    </>
  );
};

export default CreateTaskModal;
