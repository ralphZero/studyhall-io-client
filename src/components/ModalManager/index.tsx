import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import CreatePlanModal from './CreatePlanModal';
import { ModalType } from '../../features/ui/ModalTypes/ModalTypes';
import { useDispatch } from 'react-redux';
import { updateActiveModal } from '../../features/ui/globalUiSlice';
import DeletePlanModal from './DeletePlanModal';

export interface ModalProps {
  isOpen: boolean;
  handleCancel: (tag: ModalType) => void;
}

const ModalManager = () => {
  const { activeModal } = useSelector((state: RootState) => state.ui);
  const dispatch = useDispatch();

  const handleCancel = (tag: ModalType) => {
    dispatch(updateActiveModal({ status: false, tag }));
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
  return null;
};

export default ModalManager;
