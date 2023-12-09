import React, { useState } from 'react';
import { FormInstance, Modal, notification } from 'antd';
import ModalTitle from '../shared/title';
import { ModalProps } from '..';
import { ModalType } from '../../../features/ui/ModalTypes/ModalTypes';
import CreateTaskForm from './CreateTaskForm';
import { TaskDtoBody } from '../../../features/api/plans/interfaces/TaskBody';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { usePostTaskMutation } from '../../../features/api/plans/taskApi';
import { useDispatch } from 'react-redux';
import { updateActiveModal } from '../../../features/ui/globalUiSlice';

const CreateTaskModal = ({
  isOpen,
  handleCancel,
  controlled,
  optionalPayload,
}: ModalProps) => {
  const currentWeekday = optionalPayload?.currentColumnId;
  const [notify, contextHolder] = notification.useNotification();
  const [createTaskLoadingState, setTaskPlanLoadingState] = useState(false);
  const { activePlanId } = useSelector((store: RootState) => store.ui);
  const [createNewTask] = usePostTaskMutation();
  const dispatch = useDispatch();

  const handleSubmitNewTask = (values: TaskDtoBody, form: FormInstance) => {
    setTaskPlanLoadingState(true);
    // prepare dto
    values.timestamp = currentWeekday;
    values.planId = activePlanId;

    createNewTask(values)
      .unwrap()
      .then(() => {
        notify.success({
          message: 'Hooray!',
          description: 'Your task has been created.',
          placement: 'bottomRight',
        });
      })
      .catch(() => {
        notify.error({
          message: 'Oh no!',
          description: 'An error has occured while creating this task.',
          placement: 'bottomRight',
        });
      })
      .finally(() => {
        setTaskPlanLoadingState(false);
        form.resetFields();
        dispatch(
          updateActiveModal({ status: false, tag: ModalType.CREATE_TASK })
        );
      });
  };

  return (
    <>
      {contextHolder}
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
            controlled={controlled}
            onCreate={handleSubmitNewTask}
            submitLoadingState={createTaskLoadingState}
          />
        </div>
      </Modal>
    </>
  );
};

export default CreateTaskModal;
