import { createSlice } from '@reduxjs/toolkit';

interface GlobalUIState {
  currentPage: string;
}

const initialState: GlobalUIState = {
  currentPage: '',
};

export const globalUiSlice = createSlice({
  name: 'globalUi',
  initialState,
  reducers: {
    updateCurrentPage: (state: GlobalUIState, action) => {
      state.currentPage = action.payload;
    },
  },
});

export default globalUiSlice.reducer;
export const { updateCurrentPage } = globalUiSlice.actions;
