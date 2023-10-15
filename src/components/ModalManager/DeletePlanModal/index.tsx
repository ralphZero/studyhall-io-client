import React from 'react';
import { ModalProps } from '..';
import { Button, Modal, notification } from 'antd';
import { ModalType } from '../../../features/ui/ModalTypes/ModalTypes';
import ModalTitle from '../CreatePlanModal/title';
import { useDeletePlanMutation } from '../../../features/api/plans/planApi';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { useDispatch } from 'react-redux';
import { updateActivePlanId } from '../../../features/ui/globalUiSlice';
import { useNavigate } from 'react-router-dom';

const DeletePlanModal = ({ isOpen, handleCancel }: ModalProps) => {
  const [api, contextHolder] = notification.useNotification();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { activePlanId, lastActivePlanId } = useSelector(
    (state: RootState) => state.ui
  );
  const [deletePlan] = useDeletePlanMutation();

  const confirmDeletion = () => {
    // call delete action
    deletePlan({ planId: activePlanId })
      .unwrap()
      .then(() => {
        api.success({
          message: 'Hooray!',
          description: 'Your plan has been successfuly removed.',
          placement: 'bottomRight',
        });
      });
    dispatch(updateActivePlanId(lastActivePlanId));
    navigate(`${lastActivePlanId}`, { replace: true });
    // close modal
    handleCancel(ModalType.DELETE_PLAN);
  };

  const closeOrCancelModal = () => {
    handleCancel(ModalType.DELETE_PLAN);
  };

  return (
    <>
      {contextHolder}
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
    </>
  );
};

export default DeletePlanModal;
