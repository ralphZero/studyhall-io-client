import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import CreatePlanModal from './CreatePlanModal';
import { ModalType } from '../../features/ui/ModalTypes/ModalTypes';
import { useDispatch } from 'react-redux';
import { updateActiveModal } from '../../features/ui/globalUiSlice';
import DeletePlanModal from './DeletePlanModal';
import CreateTaskModal from './CreateTaskModal';

export interface ModalProps {
  isOpen: boolean;
  handleCancel: (tag: ModalType, callback?: () => void) => void;
  optionalPayload?: any;
  controlled?: boolean;
}

const ModalManager = () => {
  const { activeModal } = useSelector((state: RootState) => state.ui);
  const dispatch = useDispatch();

  const handleCancel = (tag: ModalType, callback?: () => void) => {
    dispatch(updateActiveModal({ status: false, tag }));
    callback?.();
  };

  if (activeModal.tag === ModalType.CREATE_PLAN) {
    return (
      <CreatePlanModal
        isOpen={activeModal.status}
        handleCancel={handleCancel}
      />
    );
  }

  if (activeModal.tag === ModalType.DELETE_PLAN) {
    return (
      <DeletePlanModal
        isOpen={activeModal.status}
        handleCancel={handleCancel}
      />
    );
  }

  if (activeModal.tag === ModalType.CREATE_TASK) {
    return (
      <CreateTaskModal
        isOpen={activeModal.status}
        handleCancel={handleCancel}
        optionalPayload={activeModal.optionalPayload}
      />
    );
  }

  if (activeModal.tag === ModalType.UPDATE_TASK) {
    return (
      <CreateTaskModal
        isOpen={activeModal.status}
        handleCancel={handleCancel}
        optionalPayload={activeModal.optionalPayload}
        controlled={true}
      />
    );
  }
  return null;
};

export default ModalManager;
