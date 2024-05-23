// store.js
import { configureStore } from '@reduxjs/toolkit';
import authSlicer from './common/authSlicer';

const store = configureStore({
  reducer: {
    auth: authSlicer,
  },
});

export default store;
