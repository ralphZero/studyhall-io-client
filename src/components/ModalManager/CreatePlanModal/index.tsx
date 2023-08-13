import { Modal } from 'antd';
import React from 'react';

interface CreatePlanModalProps {
  isOpen: boolean;
  handleCancel: () => void;
}

const CreatePlanModal = ({ isOpen, handleCancel }: CreatePlanModalProps) => {
  const handleOk = () => {};

  return (
    <Modal
      title='Basic Modal'
      open={isOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={null}>
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Modal>
  );
};

export default CreatePlanModal;
