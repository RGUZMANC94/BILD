import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  contactSelected: {},
};

export const contactSelectedSlice = createSlice({
  name: 'contactSelected',
  initialState,
  reducers: {
    changeContactSelected: (state, action) => {
      state.contactSelected = action.payload;
    },
  },
});

export const { changeContactSelected } = contactSelectedSlice.actions;
export default contactSelectedSlice.reducer;
