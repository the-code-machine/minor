import { createSlice } from '@reduxjs/toolkit';

const initialState = {
isFetching:false,
};

const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    update: (state, action) => {
      
      return {...state,...action.payload}
    },
    startFetch: (state) => {
      state.isFetching = true;
    },
    doneFetch: (state) => {
      state.isFetching = false;
    },
  },
});

export const { update ,startFetch,doneFetch} = projectSlice.actions;

export default projectSlice.reducer;
