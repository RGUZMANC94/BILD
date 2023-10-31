import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  typeSelected: 0,
};

export const typeSelectedSlice = createSlice({
  name: "typeSelected",
  initialState,
  reducers: {
    changeTypeSelected: (state, action) => {
      state.typeSelected = action.payload;
    },
  },
});

export const { changeTypeSelected } = typeSelectedSlice.actions;
export default typeSelectedSlice.reducer;
