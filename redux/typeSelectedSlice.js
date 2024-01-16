import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  typeSelected: 0,
  typeSelectedName: '', // Nuevo atributo
};

export const typeSelectedSlice = createSlice({
  name: 'typeSelected',
  initialState,
  reducers: {
    changeTypeSelected: (state, action) => {
      state.typeSelected = action.payload;
    },
    changeTypeSelectedName: (state, action) => {
      state.typeSelectedName = action.payload;
    },
  },
});

export const { changeTypeSelected, changeTypeSelectedName } =
  typeSelectedSlice.actions;
export default typeSelectedSlice.reducer;
