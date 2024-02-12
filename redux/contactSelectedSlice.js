import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  contactSelected: {},
  contactListSelected: {},
};

export const contactSelectedSlice = createSlice({
  name: 'contactSelected',
  initialState,
  reducers: {
    changeContactSelected: (state, action) => {
      state.contactSelected = action.payload;
    },
    changeContactListSelected: (state, action) => {
      state.contactListSelected = action.payload;
    },
  },
});

export const { changeContactSelected, changeContactListSelected } =
  contactSelectedSlice.actions;
export default contactSelectedSlice.reducer;
