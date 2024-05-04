import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  projectEdit: {},
  unitEdit: {},
  typeEdit: {},
  contactEdit: {},
};

export const editObjectSlice = createSlice({
  name: 'editObject',
  initialState,
  reducers: {
    changeProjectEdit: (state, action) => {
      state.projectEdit = action.payload;
    },
    changeUnitEdit: (state, action) => {
      state.unitEdit = action.payload;
    },
    changeTypeEdit: (state, action) => {
      state.typeEdit = action.payload;
    },
    changeContactEdit: (state, action) => {
      state.typeEdit = action.payload;
    }
  },
});

export const { changeProjectEdit, changeUnitEdit, changeTypeEdit } =
  editObjectSlice.actions;
export default editObjectSlice.reducer;
