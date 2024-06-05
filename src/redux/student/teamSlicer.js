import { createSlice } from '@reduxjs/toolkit';

const initialState = {
isFetching:false,
};

const teamSlice = createSlice({
  name: 'team',
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

export const { update ,startFetch,doneFetch} = teamSlice.actions;

export default teamSlice.reducer;
