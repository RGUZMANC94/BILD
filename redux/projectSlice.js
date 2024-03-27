import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  projectsList: [],
  filteredList: [],
  isFiltered: false,
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
    setFilteredList: (state, action) => {
      state.filteredList = action.payload;
    },
    onFilter: (state, action) => {
      state.isFiltered = action.payload;
    },
  },
});

export const { addNewProject, setProjects, setFilteredList, onFilter } =
  projectSlice.actions;
export default projectSlice.reducer;
