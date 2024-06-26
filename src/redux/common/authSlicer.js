import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  userId: null,
  token: null,
  userType: null,
  linkdInUrl: null,
  gitUrl: null,
  twitterUrl: null,
  profileImage: null,
  coverImage: null,
  isFetching:false,
  teamId:null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.userId = action.payload.userId;
      state.token = action.payload.token;
      state.userType = action.payload.userType;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.userId = null;
      state.token = null;
      state.userType = null;
    },
    update: (state, action) => {
      // Merge the existing state with the updated fields
      return { ...state, ...action.payload };

    },

    startFetch: (state) => {
      state.isFetching = true;
    },
    doneFetch: (state) => {
      state.isFetching = false;
    },
  },
});

export const { login, logout, update ,startFetch,doneFetch} = authSlice.actions;

export default authSlice.reducer;
