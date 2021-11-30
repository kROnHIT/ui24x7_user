
import { all, call, fork, put, takeEvery, delay } from 'redux-saga/effects';
const Parse = require('parse/react-native');
import AsyncStorage from "@react-native-community/async-storage";
import { ToastActionsCreators } from 'react-native-redux-toast';
import {
    ADD_MESSAGE_TO_GUARD,
    ADD_FUTURE_ENTRY,
} from '../actions';

import {
    addMessageToGuardSuccess,
    addMessageToGuardError,
    addFutureEntrySuccess,
    addFutureEntryError
} from '../actions';


const addMessageToGuardAsync = async (data) => {
    return await new Promise((success, fail) => {
        success(Parse.Cloud.run("messageGuard", data))
    })
        .then(response => response)
        .catch(error => error)
}


function* addMessageToGuard(action) {
    console.log('looo', action);
    try {
        let Res = yield call(addMessageToGuardAsync, action.payload);

        if (Res && Res.success === true) {
            console.log("data", Res);
            yield put(addMessageToGuardSuccess({ success: true, message: Res.message }));
            yield put(ToastActionsCreators.displayError('Meessage seent to guard!'));
            action.payload.callback(Res);
        }
        else {
            yield put(ToastActionsCreators.displayError('Unable to Submit!!'));
            yield put(addMessageToGuardError({ success: false, message: "Unable to Submit! try after some time" }));
        }
    } catch (error) {
        yield put(ToastActionsCreators.displayError('Unable to Submit!!'));
        yield put(addMessageToGuardError({ success: false, message: "Unable to Submit! try after some time" }));
    }
}

const addFutureEntryAsync = async (data) => {
    return await new Promise((success, fail) => {
        success(Parse.Cloud.run("allowFutureEntry", data))
    })
        .then(response => response)
        .catch(error => error)
}


function* addFutureEntry(action) {
    console.log('looo', action);
    try {
        let Res = yield call(addFutureEntryAsync, action.payload.data);

        console.log("params", Res);
        if (Res && Res.success === true) {
            let data = JSON.parse(JSON.stringify(Res));
            console.log("data", data);
            yield put(addFutureEntrySuccess({ success: true, message: data.response }));
            yield put(ToastActionsCreators.displayError('Future entry added!'));
            action.payload.callback(Res.success);
        }
        else {
            yield put(ToastActionsCreators.displayError('Unable to Submit!!'));
            yield put(addFutureEntryError({ success: false, message: "Unable to Submit! try after some time" }));
        }
    } catch (error) {
        yield put(ToastActionsCreators.displayError('Unable to Submit!!'));
        yield put(addFutureEntryError({ success: false, message: "Unable to Submit! try after some time" }));
    }
}


export function* watchAddMessageToGuard() {
    yield takeEvery(ADD_MESSAGE_TO_GUARD, addMessageToGuard);
}
export function* watchAddFutureEntry() {
    yield takeEvery(ADD_FUTURE_ENTRY, addFutureEntry);
}

export default function* rootSaga() {
    yield all([
        fork(watchAddMessageToGuard),
        fork(watchAddFutureEntry),
    ]);
}