import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  projectsList: [],
};

export const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    addNewProject: (state, action) => {
      state.projectsList = [...state.projectsList, action.payload];
    },
    setProjects: (state, action) => {
      state.projectsList = action.payload;
    },
  },
});

export const { addNewProject, setProjects } = projectSlice.actions;
export default projectSlice.reducer;
