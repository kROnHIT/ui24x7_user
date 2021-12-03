
import { all, call, fork, put, takeEvery, delay } from 'redux-saga/effects';
import {
  FETCH_EMERGENCY
} from '../actions';

import {
  fetchEmergencySuccess,
  fetchEmergencyError,
} from '../actions';

const fetchEmergencyAsync = async (data) => {
  const resp = await fetch(
    `http://34.131.47.126:8080/upcharindia/ViewEmergencyServiceACToState?${data}`,
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    },
  );
  return resp.json();
}
function* fetchEmergency(action) {
  try {
    console.log('pppppppppppppppp', action);
    let Res = yield call(fetchEmergencyAsync, action.payload);
    console.log('Res', Res);
    if (Res && Res.Statuscode === 1) {
      yield put(fetchEmergencySuccess({ success: true, emergeencyData: Res.LoginResponse }));
    } else {
      yield put(fetchEmergencySuccess({ success: true, emergeencyData: '' }));
    }
  } catch (error) {
    yield put(
      fetchEmergencyError({
        success: false,
        message: 'Invalid mobile or password!',
      }),
    );
  }
}

export function* watchFetchEmergency() {
  yield takeEvery(FETCH_EMERGENCY, fetchEmergency);
}

export default function* rootSaga() {
  yield all([
    fork(watchFetchEmergency),
  ]);
}