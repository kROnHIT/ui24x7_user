
import { all, call, fork, put, takeEvery, delay } from 'redux-saga/effects';
const Parse = require('parse/react-native');
import AsyncStorage from "@react-native-community/async-storage";
import { ToastActionsCreators } from 'react-native-redux-toast';
import {
    ADD_SECURITY,
} from '../actions';

import {
    addSecuritySuccess,
    addSecurityError,
} from '../actions';


const addSecurityAsync = async (data) => {
    console.log('data', data);
    return await new Promise((success, fail) => {
        success(Parse.Cloud.run("raiseAlert", data))
    })
        .then(response => response)
        .catch(error => error)
}


function* addSecurity(action) {
    ToastActionsCreators.displayInfo('Logged In Successfully!');
    try {
        let Res = yield call(addSecurityAsync, action.payload.data);

        console.log("params", Res);
        if (Res && Res.success === true) {
            // let data = JSON.parse(JSON.stringify(Res));
            yield put(addSecuritySuccess({ success: true, user: data.response, userProperty: Respon }));
            ToastActionsCreators.displayInfo('Logged In Successfully!');
        }
        else {
            yield put(ToastActionsCreators.displayError('Unable to Submit!!'));
            yield put(addSecurityError({ success: false, message: "Unable to Submit! try after some time" }));
        }
    } catch (error) {
        yield put(addSecurityError({ success: false, message: "Unable to Submit! try after some time" }));
    }
}


export function* watchAddSecurity() {
    yield takeEvery(ADD_SECURITY, addSecurity);
}

export default function* rootSaga() {
    yield all([
        fork(watchAddSecurity),
    ]);
}