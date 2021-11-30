import { all } from 'redux-saga/effects';
import authSaga from './auth/saga'
import securitySaga from './security/saga'
import profileSaga from './profile/saga'
import quickActionSaga from './quickAction/saga'
import complainSaga from './complain/saga'
import homeSaga from './home/saga'


export default function* rootSaga(getState) {
  yield all([
    authSaga(),
    securitySaga(),
    profileSaga(),
    quickActionSaga(),
    complainSaga(),
    homeSaga(),
  ]);
}
