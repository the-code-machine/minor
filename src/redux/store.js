// store.js
import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import authSlicer from './common/authSlicer';
import rootSaga from './common/fetchData';
import teamSlicer from './student/teamSlicer'
import projectSlicer from './student/projectSlicer';
const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    auth: authSlicer,
    team:teamSlicer,
    project:projectSlicer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export default store;