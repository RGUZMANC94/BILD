import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  openPopUpOportunity: false,
};

export const popUpOportunity = createSlice({
  name: 'popUpOportunity',
  initialState,
  reducers: {
    openPopUp: (state, action) => {
      state.openPopUpOportunity = true;
    },
    closePopUp: (state, action) => {
      state.openPopUpOportunity = false;
    },
  },
});

export const { openPopUp, closePopUp } = popUpOportunity.actions;
export default popUpOportunity.reducer;
