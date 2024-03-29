import React, { useState } from 'react';
import { Button, ConfigProvider, FormInstance, Modal } from 'antd';
import ModalTitle from '../shared/title';
import CreatePlanForm, { Values } from './CreatePlanForm';
import ModalDivider from '../shared/ModalDivider';
import { Moment } from 'moment';
import { usePostPlanMutation } from '../../../features/api/plans/planApi';
import { PlanDtoBody } from '../../../features/api/plans/interfaces/PlanBody';
import { ModalType } from '../../../features/ui/ModalTypes/ModalTypes';
import { useDispatch } from 'react-redux';
import {
  updateActiveModal,
  updateActivePlanId,
} from '../../../features/ui/globalUiSlice';
import { ModalProps } from '..';
import { useNavigate } from 'react-router-dom';

const CreatePlanModal = ({ isOpen, handleCancel }: ModalProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [createPlanLoadingState, setCreatePlanLoadingState] = useState(false);
  const [createNewPlan] = usePostPlanMutation();

  const handleSubmitNewPlan = (values: Values, form: FormInstance) => {
    setCreatePlanLoadingState(true);
    //  Prepare payload to be sent
    const start: Moment = values.timeframe.at(0) as Moment;
    const end: Moment = values.timeframe.at(1) as Moment;
    const planDto: PlanDtoBody = {
      startTimestamp: start.toDate().getTime().toString(),
      endTimestamp: end.toDate().getTime().toString(),
      title: values.title,
      description: values.description,
    };

    createNewPlan(planDto)
      .unwrap()
      .then((response) => {
        const newPlanId = response.data.insertedId;
        dispatch(updateActivePlanId(newPlanId));
        navigate(`${newPlanId}`, { replace: true });
      })
      .finally(() => {
        setCreatePlanLoadingState((oldState) => !oldState);
        form.resetFields();
        dispatch(
          updateActiveModal({ status: false, tag: ModalType.CREATE_PLAN })
        );
      });
  };

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
      onCancel={() => handleCancel(ModalType.CREATE_PLAN)}
      footer={null}>
      <div className='mt-4'>
        <CreatePlanForm
          onCreate={handleSubmitNewPlan}
          submitLoadingState={createPlanLoadingState}
        />
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
        <ConfigProvider
          theme={{
            components: {
              Button: {
                colorPrimary: '#000000',
                colorPrimaryActive: '#000000',
                colorPrimaryHover: '#000000',
                defaultColor: '#000000',
              },
            },
          }}>
          <Button
            className='font-sans font-light w-32 h-[38px] rounded-sm bg-black'
            type='primary'>
            Udemy
          </Button>
        </ConfigProvider>
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
