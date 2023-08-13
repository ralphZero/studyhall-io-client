import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface GlobalUIState {
  activePlanId: string;
  activeModal: ModalState;
}

interface ModalState {
  status: boolean;
  tag?: string;
}

const initialState: GlobalUIState = {
  activePlanId: '',
  activeModal: {
    status: false,
  },
};

export const globalUiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    updateActivePlanId: (
      state: GlobalUIState,
      action: PayloadAction<string>
    ) => {
      state.activePlanId = action.payload;
    },
    updateActiveModal: (
      state: GlobalUIState,
      action: PayloadAction<ModalState>
    ) => {
      state.activeModal = action.payload;
    },
  },
});

export default globalUiSlice.reducer;
export const { updateActivePlanId, updateActiveModal } = globalUiSlice.actions;
