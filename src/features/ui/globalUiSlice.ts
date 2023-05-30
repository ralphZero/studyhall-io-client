import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface GlobalUIState {
  activePlanId: string;
}

const initialState: GlobalUIState = {
  activePlanId: '',
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
  },
});

export default globalUiSlice.reducer;
export const { updateActivePlanId } = globalUiSlice.actions;
