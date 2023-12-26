import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  opportunitiesList: [],
};

export const opportunitieSlice = createSlice({
  name: 'opportunities',
  initialState,
  reducers: {
    setOpportunities: (state, action) => {
      state.opportunitiesList = action.payload;
    },
  },
});

export const { setOpportunities } = opportunitieSlice.actions;
export default opportunitieSlice.reducer;
