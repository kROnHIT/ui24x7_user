import { all, call, fork, put, takeEvery, delay } from 'redux-saga/effects';
import AsyncStorage from '@react-native-community/async-storage';
import { ToastActionsCreators } from 'react-native-redux-toast';

import {
  CHECK_USER,
  LOGIN_WITH_PASSWORD,
  LOGOUT_USER,
  REGISTER_USER,
  GET_STATE,
  GET_CITY,
  ENQUIRY
} from '../actions';

import {
  loginWithPasswordSuccess,
  loginWithPasswordError,
  registerUserSuccess,
  registerUserError,
  getStateSuccess,
  getStateError,
  getCitySuccess,
  getCityError,
  enquirySuccess,
  enquiryError
} from '../actions';

const loginWithPasswordAsync = async data => {
  const { userName, password } = data;
  const resp = await fetch(
    `http://34.131.47.126:8080/upcharindia/CheckLoginDetails?USERNAME=${userName}&PASSWORD=${password}`,
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

function* loginWithPassword(action) {
  try {
    let Res = yield call(loginWithPasswordAsync, action.payload.data);
    if (Res && Res.Statuscode === 1) {
      AsyncStorage.setItem('user', JSON.stringify(Res.loginBean));
      action.payload.data.callback();
      yield put(loginWithPasswordSuccess({ success: true, user: Res.loginBean }));
    } else {
      yield put(
        loginWithPasswordSuccess({
          success: true,
          user: '',
          message: Res.Message,
        }),
      );
      yield put(
        loginWithPasswordSuccess({
          success: true,
          user: '',
          message: '',
        }),
      );
    }
  } catch (error) {
    yield put(
      loginWithPasswordError({
        success: false,
        message: error,
      }),
    );
  }
}

const logoutAsync = async () => {
  AsyncStorage.removeItem('user');
};

function* logout({ payload }) {
  try {
    yield call(logoutAsync);
    payload.navigation.navigate('LoginStackScreen', { screen: 'Login' });
  } catch (error) { }
}

function* checkUser(action) {
  try {
    yield put(loginWithPasswordSuccess({ user: action.payload.value }));
    action.payload.callback();
  } catch (error) { }
}

const registerUserAsync = async data => {
  const resp = await fetch(
    `http://34.131.47.126:8080/upcharindia/AddUser?${data}`,
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

function* registerUser(action) {
  try {
    console.log('action', action);
    let Res1 = yield call(registerUserAsync, action.payload.data);
    console.log('Res1', Res1);
    if (Res1 && Res1.Statuscode === 1) {
      AsyncStorage.setItem('user', JSON.stringify(Res1.loginBean));
      action.payload.callback(Res1);
      // yield put(
      //   loginWithPasswordSuccess({ success: true, user: Res1.loginBean }),
      // );
      yield put(
        registerUserSuccess({ success: true, user: Res1.loginBean, message: Res1.Message }),
      );
      yield put(registerUserSuccess({ success: true, message: '' }));
    } else {
      yield put(
        registerUserError({
          success: false,
          message: Res1.Message,
        }),
      );
    }
  } catch (error) {
    yield put(
      registerUserError({
        success: false,
        message: 'Invalid mobile or password!',
      }),
    );
  }
}

const getStateAsync = async () => {
  const resp = await fetch('http://34.131.47.126:8080/upcharindia/StateList', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  return resp.json();
};

function* getState(action) {
  try {
    let Res = yield call(getStateAsync);
    if (Res) {
      yield put(getStateSuccess({ success: true, state: Res.LoginResponse }));
    } else {
      action.payload.data.callback(Res);
      yield put(getStateSuccess({ success: true, state: '' }));
    }
  } catch (error) {
    yield put(
      getStateError({
        success: false,
        message: 'Try Again Later!',
      }),
    );
  }
}

const getCityAsync = async city => {
  const resp = await fetch(
    'http://34.131.47.126:8080/upcharindia/CityList?STATE_ID=' + city,
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

function* getCity(action) {
  try {
    let Res = yield call(getCityAsync, action.payload);
    if (Res) {
      yield put(getCitySuccess({ success: true, city: Res.LoginResponse }));
    } else {
      action.payload.data.callback(Res);
      yield put(getCitySuccess({ success: true, city: '' }));
    }
  } catch (error) {
    yield put(
      getCityError({
        success: false,
        message: 'Try Again Later!',
      }),
    );
  }
}


const enquiryAsync = async data => {
  const resp = await fetch(
    `http://34.131.47.126:8080/upcharindia/GenerateEnquiry?${data}`,
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

function* enquiry(action) {
  try {
    let Res1 = yield call(enquiryAsync, action.payload.data);
    if (Res1 && Res1.Statuscode === 1) {
      yield put(
        enquirySuccess({ success: true, message: Res1.Message }),
      );
      action.payload.callback(Res1);
      yield put(enquirySuccess({ success: true, message: '' }));
    } else {
      yield put(
        enquiryError({
          success: false,
          message: Res1.Message,
        }),
      );
    }
  } catch (error) {
    yield put(
      enquiryError({
        success: false,
        message: 'Invalid mobile or password!',
      }),
    );
  }
}

export function* watchCheckUser() {
  yield takeEvery(CHECK_USER, checkUser);
}
export function* watchloginWithPassword() {
  yield takeEvery(LOGIN_WITH_PASSWORD, loginWithPassword);
}
export function* watchLogoutUser() {
  yield takeEvery(LOGOUT_USER, logout);
}
export function* watchRegisterUser() {
  yield takeEvery(REGISTER_USER, registerUser);
}
export function* watchGetState() {
  yield takeEvery(GET_STATE, getState);
}
export function* watchGetCity() {
  yield takeEvery(GET_CITY, getCity);
}
export function* watchEnquiry() {
  yield takeEvery(ENQUIRY, enquiry);
}

export default function* rootSaga() {
  yield all([
    fork(watchCheckUser),
    fork(watchloginWithPassword),
    fork(watchLogoutUser),
    fork(watchRegisterUser),
    fork(watchGetState),
    fork(watchGetCity),
    fork(watchEnquiry),
  ]);
}
