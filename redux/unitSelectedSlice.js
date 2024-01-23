import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  unitSelected: {
    balconyArea: '',
    baths: '',
    bedrooms: '',
    builtArea: '',
    fieldSize: '',
    group: '',
    idProperty: '',
    nuimb: '',
    parkingAmount: '',
    parkingArea: '',
    parkingType: '',
    phase: '',
    privateArea: '',
    projectId: '',
    propertyPrice: '',
    status: '',
    storageArea: '',
    terraceArea: '',
    type: '',
  },
};

export const unitSelectedSlice = createSlice({
  name: 'unitSelected',
  initialState,
  reducers: {
    changeUnitSelected: (state, action) => {
      state.unitSelected = action.payload;
    },
  },
});

export const { changeUnitSelected } = unitSelectedSlice.actions;
export default unitSelectedSlice.reducer;
