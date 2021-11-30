
import { all, call, fork, put, takeEvery, delay } from 'redux-saga/effects';
const Parse = require('parse/react-native');
import AsyncStorage from "@react-native-community/async-storage";
import { ToastActionsCreators } from 'react-native-redux-toast';
import {
    FETCH_NOTICE_ALL,
} from '../actions';

import {
    fetchNoticeAllSuccess,
    fetchNoticeAllError,
} from '../actions';


const fetchNoticeAllAsync = async (data) => {
    let PropertyMember = Parse.Object.extend("PropertyNotice");
    let Property = Parse.Object.extend("Property");
    let PropertyPointer = new Property();
    PropertyPointer.id = data;
    let PropertyMemberQry = new Parse.Query(PropertyMember);
    PropertyMemberQry.equalTo("property", PropertyPointer);
    return await PropertyMemberQry.find()
        .then((response) => response)
        .catch((error) => error);
}
function* fetchNoticeAll(action) {
    console.log('qqqqqq', action);
    try {
        let Res = yield call(fetchNoticeAllAsync, action.payload);
        
        if (Res && Res !== '') {
            console.log('dddddddd', Res);
            yield put(fetchNoticeAllSuccess({ success: true, noticeListAll: JSON.parse(JSON.stringify(Res)) }));
            action.payload.callback(Res.success);
        }
        else {
            yield put(fetchNoticeAllError({ success: false }));
        }
    } catch (error) {
        yield put(fetchNoticeAllError({ success: false }));
    }
}

export function* watchFetchNoticeAll() {
    yield takeEvery(FETCH_NOTICE_ALL, fetchNoticeAll);
}

export default function* rootSaga() {
    yield all([
        fork(watchFetchNoticeAll),
    ]);
}