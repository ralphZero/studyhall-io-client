import React, { useState } from 'react';
import { FormInstance, Modal } from 'antd';
import ModalTitle from '../shared/title';
import { ModalProps } from '..';
import { ModalType } from '../../../features/ui/ModalTypes/ModalTypes';
import CreateTaskForm from './CreateTaskForm';
import { TaskDtoBody } from '../../../features/api/plans/interfaces/TaskBody';

const CreateTaskModal = ({ isOpen, handleCancel }: ModalProps) => {
  const [createTaskLoadingState, setTaskPlanLoadingState] = useState(false);
  const handleSubmitNewTask = (values: TaskDtoBody, form: FormInstance) => {
    setTaskPlanLoadingState(true);
    console.log(values);
  };

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
          <CreateTaskForm
            onCreate={handleSubmitNewTask}
            submitLoadingState={createTaskLoadingState}
          />
        </div>
      </Modal>
    </>
  );
};

export default CreateTaskModal;
