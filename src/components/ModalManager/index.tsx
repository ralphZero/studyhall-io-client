import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import CreatePlanModal from './CreatePlanModal';
import { ModalType } from '../../features/ui/ModalTypes/ModalTypes';
import { useDispatch } from 'react-redux';
import { updateActiveModal } from '../../features/ui/globalUiSlice';

const ModalManager = () => {
  const { activeModal } = useSelector((state: RootState) => state.ui);
  const dispatch = useDispatch();

  if (activeModal.tag === ModalType.CREATE_PLAN) {
    return (
      <CreatePlanModal
        isOpen={activeModal.status}
        handleCancel={() =>
          dispatch(
            updateActiveModal({ status: false, tag: ModalType.CREATE_PLAN })
          )
        }
      />
    );
  }
  return <></>;
};

export default ModalManager;
