import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  opportunitySelected: '',
};

export const opportunitySelectedSlice = createSlice({
  name: 'opportunitySelected',
  initialState,
  reducers: {
    changeOpportunitySelected: (state, action) => {
      state.opportunitySelected = action.payload;
    },
  },
});

export const { changeOpportunitySelected } = opportunitySelectedSlice.actions;
export default opportunitySelectedSlice.reducer;
