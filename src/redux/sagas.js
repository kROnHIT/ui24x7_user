import { all } from 'redux-saga/effects';
import authSaga from './auth/saga'
import classifiedSaga from './classified/saga'


export default function* rootSaga(getState) {
  yield all([
    authSaga(),
    classifiedSaga(),
  ]);
}
