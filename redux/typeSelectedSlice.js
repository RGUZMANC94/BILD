import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  typeSelected: 0,
  typeSelectedName: '',
  imgTypeSelected: '',
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
    updateImgTypeSelected: (state, action) => {
      state.imgTypeSelected = action.payload;
    },
  },
});

export const {
  changeTypeSelected,
  changeTypeSelectedName,
  updateImgTypeSelected,
} = typeSelectedSlice.actions;
export default typeSelectedSlice.reducer;
