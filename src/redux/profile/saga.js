
import { all, call, fork, put, takeEvery, delay } from 'redux-saga/effects';
const Parse = require('parse/react-native');
import AsyncStorage from "@react-native-community/async-storage";
import { ToastActionsCreators } from 'react-native-redux-toast';
import {
    ADD_FAMILY_MEMBER,
    FETCH_FAMILY_MEMBER,
    ADD_VEHICLE,
    FETCH_VEHICLE,
    ADD_DAILY_HELP,
    FETCH_DAILY_HELP,
} from '../actions';

import {
    addFamilyMemberSuccess,
    addFamilyMemberError,
    fetchFamilyMemberSuccess,
    fetchFamilyMemberError,
    addVehicleSuccess,
    addVehicleError,
    fetchVehicleSuccess,
    fetchVehicleError,
    addDailyHelpSuccess,
    addDailyHelpError,
    fetchDailyHelpSuccess,
    fetchDailyHelpError,
} from '../actions';


const addFamilyMemberAsync = async (data) => {
    return await new Promise((success, fail) => {
        success(Parse.Cloud.run("addFamilyMember", data))
    })
    .then(response => response)
    .catch(error => error)
}
function* addFamilyMember(action) {
    console.log('action', action);
    try {
        let Res = yield call(addFamilyMemberAsync, action.payload);
        
        if (Res && Res.success === true) {
            yield put(addFamilyMemberSuccess({ success: true, message: Res.message }));
            yield put(ToastActionsCreators.displayError('Family member added!'));
            action.payload.callback(Res.success);
        }
        else {
            yield put(addFamilyMemberError({ success: false, message: "Unable to Submit! try after some time" }));
        }
    } catch (error) {
        yield put(addFamilyMemberError({ success: false, message: "Unable to Submit! try after some time" }));
    }
}

const fetchFamilyMemberAsync = async (data) => {
    let PropertyMember = Parse.Object.extend("PropertyMemberFamily");
    let PropertyMemberQry = new Parse.Query(PropertyMember);
    return await PropertyMemberQry.find()
        .then((response) => response)
        .catch((error) => error);
}
function* fetchFamilyMember(action) {
    try {
        let Res = yield call(fetchFamilyMemberAsync, action.payload);
        
        if (Res && Res !== '') {
            console.log('data', Res);
            yield put(fetchFamilyMemberSuccess({ success: true, familyMemberList: JSON.parse(JSON.stringify(Res)) }));
            action.payload.callback(Res.success);
        }
        else {
            yield put(fetchFamilyMemberError({ success: false }));
        }
    } catch (error) {
        yield put(fetchFamilyMemberError({ success: false }));
    }
}





const addVehicleAsync = async (data) => {
    return await new Promise((success, fail) => {
        success(Parse.Cloud.run("addPersonalVehicle", data))
    })
    .then(response => response)
    .catch(error => error)
}
function* addVehicle(action) {
    console.log('action', action);
    try {
        let Res = yield call(addVehicleAsync, action.payload);
        
        if (Res && Res.success === true) {
            yield put(addVehicleSuccess({ success: true, message: Res.message }));
            yield put(ToastActionsCreators.displayError('Vehicle added!'));
            action.payload.callback(Res.success);
        }
        else {
            yield put(addVehicleError({ success: false, message: "Unable to Submit! try after some time" }));
        }
    } catch (error) {
        yield put(addVehicleError({ success: false, message: "Unable to Submit! try after some time" }));
    }
}

const fetchVehicleAsync = async (data) => {
    let PropertyMember = Parse.Object.extend("PropertyMemberVehicle");
    let PropertyMemberQry = new Parse.Query(PropertyMember);
    return await PropertyMemberQry.find()
        .then((response) => response)
        .catch((error) => error);
}
function* fetchVehicle(action) {
    try {
        let Res = yield call(fetchVehicleAsync, action.payload);
        
        if (Res && Res !== '') {
            console.log('datsssa', Res);
            yield put(fetchVehicleSuccess({ success: true, familyVehicleList: JSON.parse(JSON.stringify(Res)) }));
            action.payload.callback(Res.success);
        }
        else {
            yield put(fetchVehicleError({ success: false }));
        }
    } catch (error) {
        yield put(fetchVehicleError({ success: false }));
    }
}

const addDailyHelpAsync = async (data) => {
    return await new Promise((success, fail) => {
        success(Parse.Cloud.run("addDailyHelp", data))
    })
    .then(response => response)
    .catch(error => error)
}
function* addDailyHelp(action) {
    console.log('action', action);
    // ToastActionsCreators.displayError('Invalid mobileasasasa or password!');
    try {
        let Res = yield call(addDailyHelpAsync, action.payload);
        
        console.log('Res', Res);
        if (Res && Res.success === true) {
            yield put(addDailyHelpSuccess({ success: true, message: Res.message }));
            yield put(ToastActionsCreators.displayError('Daily help added!'));
            action.payload.callback(Res.success);
        }
        else {
            yield put(addDailyHelpError({ success: false, message: "Unable to Submit! try after some time" }));
        }
    } catch (error) {
        yield put(addDailyHelpError({ success: false, message: "Unable to Submit! try after some time" }));
    }
}

const fetchDailyHelpAsync = async (data) => {
    let PropertyMember = Parse.Object.extend("PropertyMemberDailyHelp");
    let PropertyMemberQry = new Parse.Query(PropertyMember);
    return await PropertyMemberQry.find()
        .then((response) => response)
        .catch((error) => error);
}
function* fetchDailyHelp(action) {
    try {
        let Res = yield call(fetchDailyHelpAsync, action.payload);
        
        if (Res && Res !== '') {
            console.log('datsssa', Res);
            yield put(fetchDailyHelpSuccess({ success: true, familyDailyHelpList: JSON.parse(JSON.stringify(Res)) }));
        }
        else {
            yield put(fetchDailyHelpError({ success: false }));
        }
    } catch (error) {
        yield put(fetchDailyHelpError({ success: false }));
    }
}

export function* watchAddFamilyMember() {
    yield takeEvery(ADD_FAMILY_MEMBER, addFamilyMember);
}
export function* watchFetchFamilyMember() {
    yield takeEvery(FETCH_FAMILY_MEMBER, fetchFamilyMember);
}
export function* watchAddVehicle() {
    yield takeEvery(ADD_VEHICLE, addVehicle);
}
export function* watchFetchVehicle() {
    yield takeEvery(FETCH_VEHICLE, fetchVehicle);
}
export function* watchAddDailyHelp() {
    yield takeEvery(ADD_DAILY_HELP, addDailyHelp);
}
export function* watchFetchDailyHelp() {
    yield takeEvery(FETCH_DAILY_HELP, fetchDailyHelp);
}

export default function* rootSaga() {
    yield all([
        fork(watchAddFamilyMember),
        fork(watchFetchFamilyMember),
        fork(watchAddVehicle),
        fork(watchFetchVehicle),
        fork(watchAddDailyHelp),
        fork(watchFetchDailyHelp),
    ]);
}