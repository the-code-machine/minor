import { takeEvery ,put,all,select,take} from 'redux-saga/effects';
import axios from 'axios';
import { update as profileUpdate ,startFetch as profilestartFetch,doneFetch as profiledoneFetch} from './authSlicer';
import { update as teamUpdate ,startFetch as teamstartFetch,doneFetch as teamdoneFetch} from'../student/teamSlicer'
import { update as projectUpdate ,startFetch as projectstartFetch,doneFetch as projectdoneFetch} from'../student/projectSlicer'
function* fetchProfile(action) {
  yield put(profilestartFetch());
  const authState = yield select((state) => state.auth);
  const url = '/api/profile';
  const formData = { userId: authState?.userId };

  try {
    const response = yield axios.post(url, formData, {
      headers: {
        'Authorization': `Bearer ${authState?.token}`,
        'Content-Type': 'application/json',
      },
    });

    if (response.data.status === 201) {
      yield put(profileUpdate(response.data.data));
     
    }
  } finally {
    yield put(profiledoneFetch());
  }
}
function* fetchTeam(action) {
  yield put(teamstartFetch());
  yield take(profileUpdate.type);

  const authState = yield select((state) => state.auth);
  const url = '/api/dashboard/student/team'

  try {
    const response = yield axios.post(url, { teamId: authState?.teamId }, {
      headers: {
        'Authorization': `Bearer ${authState?.token}`, // Correct format for Bearer token
        'Content-Type': 'application/json',  // If you're using FormData, make sure Content-Type is set properly
      },
    })

    if (response.data.status === 201) {
      yield put(teamUpdate(response.data.data));
     
    }
  } finally {
    yield put(teamdoneFetch());
  }
}

function* fetchProject(action) {
  yield put(projectstartFetch());
  yield take(profileUpdate.type);
  yield take(teamUpdate.type);
  const authState = yield select((state) => state.auth);
  const teamState = yield select((state) => state.team);

  const url = `/api/dashboard/student/project/${teamState?.teamId}`

  try {
    const response = yield axios.get(url, {
      headers: {
        'Authorization': `Bearer ${authState?.token}`, 
        'Content-Type': 'application/json',  
      },
    })
    if (response.status === 201) {
      yield put(projectUpdate(response.data.project));
    } else {
      console.error('Error fetching project:', response.status, response.data);
      yield put(projectUpdate(null)); // Set project data to null on error
    }
  } catch (error) {
    console.error('Network error:', error);
    yield put(projectUpdate(null)); // Set project data to null on error
  } finally {
    yield put(projectdoneFetch());
  }
}


function* watchFetchProfileActions() {
  yield takeEvery('AUTH_STATE_CHANGED', fetchProfile);
}
function* watchFetchTeamActions() {
  yield takeEvery('Team_STATE_CHANGED', fetchTeam);
}
function* watchFetchProjectActions() {
  yield takeEvery('PROJECT_STATE_CHANGED', fetchProject);
}
export default function* rootSaga() {
  yield all([
    watchFetchProfileActions(),
    watchFetchTeamActions(),
    watchFetchProjectActions(),
  ]);
}