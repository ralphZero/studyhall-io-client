import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface GlobalUIState {
  activePlanId: string;
  lastActivePlanId: string;
  activeModal: ModalState;
}

interface ModalState {
  status: boolean;
  tag?: string;
  optionalPayload?: any;
}

const initialState: GlobalUIState = {
  activePlanId: '',
  lastActivePlanId: '',
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
      if (state.activePlanId !== '' && state.activePlanId !== action.payload) {
        state.lastActivePlanId = state.activePlanId;
      }
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
