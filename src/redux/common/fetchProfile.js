import { takeEvery ,put,all,select} from 'redux-saga/effects';
import axios from 'axios';
import { update } from './authSlicer';
function* fetchProfile(action) {
  const authState = yield select((state) => state.auth);
  const url = '/api/profile';
  const formData = { userId: authState?.userId };
  const response = yield axios.post(url, formData, {
    headers: {
      'Authorization': `Bearer ${authState?.token}`,
      'Content-Type': 'application/json',
    },
  });

  if (response.data.status === 201) {
    yield put(update(response.data.data));
  }
}

function* watchAllActions() {
  yield takeEvery('AUTH_STATE_CHANGED', fetchProfile);
}

export default function* rootSaga() {
  yield all([
    watchAllActions(),
    // other sagas...
  ]);
}