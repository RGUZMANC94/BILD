import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOnZoomImg: false,
  imgToZoom: '',
};

export const toggleZoomImg = createSlice({
  name: 'toggleZoomImg',
  initialState,
  reducers: {
    openZoomImg: (state, action) => {
      state.isOnZoomImg = true;
      state.imgToZoom = action.payload;
    },
    closeZoomImg: (state, action) => {
      state.isOnZoomImg = false;
      state.imgToZoom = '';
    },
  },
});

export const { openZoomImg, closeZoomImg } = toggleZoomImg.actions;
export default toggleZoomImg.reducer;
