import React, { useState } from 'react';
import { Form, FormInstance, Modal, notification } from 'antd';
import ModalTitle from '../shared/title';
import { ModalProps } from '..';
import { ModalType } from '../../../features/ui/ModalTypes/ModalTypes';
import CreateTaskForm from './CreateTaskForm';
import { TaskDtoBody } from '../../../features/api/plans/interfaces/TaskBody';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import {
  usePostTaskMutation,
  useUpdateTaskMutation,
} from '../../../features/api/plans/taskApi';
import { useDispatch } from 'react-redux';
import { updateActiveModal } from '../../../features/ui/globalUiSlice';
import { Task } from '../../../models/v2/task';

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
  const [updateTask] = useUpdateTaskMutation();
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const handleTaskCreation = (values: TaskDtoBody, form: FormInstance) => {
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

  const handleTaskModification = (values: TaskDtoBody, form: FormInstance) => {
    updateTask(values)
      .unwrap()
      .then(() => {
        notify.success({
          message: 'Hooray!',
          description: 'Your task has been updated.',
          placement: 'bottomRight',
        });
      })
      .catch(() => {
        notify.error({
          message: 'Oh no!',
          description: 'An error has occured while updating this task.',
          placement: 'bottomRight',
        });
      })
      .finally(() => {
        setTaskPlanLoadingState(false);
        form.resetFields();
        dispatch(
          updateActiveModal({ status: false, tag: ModalType.UPDATE_TASK })
        );
      });
  };

  const handleSubmitNewTask = (values: TaskDtoBody, form: FormInstance) => {
    setTaskPlanLoadingState(true);
    // prepare dto
    values.timestamp = currentWeekday;
    values.planId = activePlanId;

    if (controlled) {
      handleTaskModification(values, form);
    } else {
      handleTaskCreation(values, form);
    }
  };

  return (
    <>
      {contextHolder}
      <Modal
        className='min-w-[954px]'
        style={{ top: 20 }}
        title={
          <ModalTitle
            title={controlled ? 'Update a task' : 'Add a task'}
            subtitle={`${
              controlled ? 'Customize a' : 'Create a personalized'
            } study plan that fits your unique style.`}
          />
        }
        open={isOpen}
        onCancel={() =>
          handleCancel(ModalType.CREATE_TASK || ModalType.UPDATE_TASK, () => {
            if (!createTaskLoadingState) {
              form.resetFields();
            }
          })
        }
        footer={null}>
        <div className='mt-4 flex'>
          <CreateTaskForm
            form={form}
            controlled={controlled}
            initialTask={optionalPayload?.task as Task}
            onCreate={handleSubmitNewTask}
            submitLoadingState={createTaskLoadingState}
          />
        </div>
      </Modal>
    </>
  );
};

export default CreateTaskModal;
