import {all, call, fork, put, takeEvery, delay} from 'redux-saga/effects';
import {
  FETCH_EMERGENCY,
  SERVICE_ENQUIRY,
  SERVICE_INFORMATION,
  SEARCH_SERVICE,
} from '../actions';

import {
  fetchEmergencySuccess,
  fetchEmergencyError,
  serviceEnquirySuccess,
  serviceEnquiryError,
  serviceInformationSuccess,
  serviceInformationError,
  searchServiceSuccess,
  searchServiceError,
} from '../actions';

const fetchEmergencyAsync = async data => {
  const resp = await fetch(
    `http://34.131.47.126:8080/upcharindia/ViewEmergencyServiceACToCity?${data}`,
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    },
  );
  return resp.json();
};
function* fetchEmergency(action) {
  try {
    // console.log('pppppppppppppppp', action);
    let Res = yield call(fetchEmergencyAsync, action.payload);
    // console.log('Res', Res);
    if (Res && Res.Statuscode === 1) {
      yield put(
        fetchEmergencySuccess({
          success: true,
          emergencyData: Res.LoginResponse,
        }),
      );
    } else {
      yield put(fetchEmergencySuccess({success: true, emergencyData: ''}));
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

const serviceEnquiryAsync = async data => {
  const resp = await fetch(
    `http://34.131.47.126:8080/upcharindia/SendServiceEnquiry?${data}`,
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    },
  );
  return resp.json();
};

function* serviceEnquiry(action) {
  try {
    let Res1 = yield call(serviceEnquiryAsync, action.payload.data);

    console.log('action', Res1);
    if (Res1 && Res1.Statuscode === 1) {
      yield put(serviceEnquirySuccess({success: true, message: Res1.Message}));
      action.payload.callback(Res1);
      yield put(serviceEnquirySuccess({success: true, message: ''}));
    } else {
      yield put(
        serviceEnquiryError({
          success: false,
          message: Res1.Message,
        }),
      );
    }
  } catch (error) {
    yield put(
      serviceEnquiryError({
        success: false,
        message: 'Try again later!',
      }),
    );
  }
}

const serviceInformationAsync = async data => {
  const resp = await fetch(
    `http://34.131.47.126:8080/upcharindia/SingleServiceFullInformation?SERVICES_ID=${data}`,
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    },
  );
  return resp.json();
};
function* serviceInformation(action) {
  try {
    let Res = yield call(serviceInformationAsync, action.payload);
    if (Res && Res.Statuscode === 1) {
      yield put(
        serviceInformationSuccess({
          success: true,
          serviceInformation: Res.servicesBean,
        }),
      );
    } else {
      yield put(
        serviceInformationSuccess({success: true, serviceInformation: ''}),
      );
    }
  } catch (error) {
    yield put(
      serviceInformationError({
        success: false,
        message: 'Try again later!',
      }),
    );
  }
}

const searchServiceAsync = async data => {
  const resp = await fetch(
    `http://34.131.47.126:8080/upcharindia/SearchData?${data}`,
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    },
  );
  return resp.json();
};
function* searchService(action) {
  try {
    console.log('pppppppppppppppp', action);
    let Res = yield call(searchServiceAsync, action.payload);
    console.log('Res', Res);
    if (Res && Res.Statuscode === 1) {
      yield put(
        searchServiceSuccess({success: true, searchResult: Res.LoginResponse}),
      );
    } else {
      yield put(searchServiceSuccess({success: true, searchResult: ''}));
    }
  } catch (error) {
    yield put(
      searchServiceError({
        success: false,
        message: 'Try again later!',
      }),
    );
  }
}

export function* watchFetchEmergency() {
  yield takeEvery(FETCH_EMERGENCY, fetchEmergency);
}
export function* watchServiceEnquiry() {
  yield takeEvery(SERVICE_ENQUIRY, serviceEnquiry);
}
export function* watchServiceInformation() {
  yield takeEvery(SERVICE_INFORMATION, serviceInformation);
}
export function* watchSearchService() {
  yield takeEvery(SEARCH_SERVICE, searchService);
}

export default function* rootSaga() {
  yield all([
    fork(watchFetchEmergency),
    fork(watchServiceEnquiry),
    fork(watchServiceInformation),
    fork(watchSearchService),
  ]);
}
