
import { all, call, fork, put, takeEvery, delay } from 'redux-saga/effects';
const Parse = require('parse/react-native');
import AsyncStorage from "@react-native-community/async-storage";
import { ToastActionsCreators } from 'react-native-redux-toast';
import {
    ADD_COMPLAIN,
    FETCH_COMPLAIN
} from '../actions';

import {
    addComplainSuccess,
    addComplainError,
    fetchComplainSuccess,
    fetchComplainError,
} from '../actions';


const addComplainAsync = async (data) => {
    return await new Promise((success, fail) => {
        success(Parse.Cloud.run("raiseComplaint", data))
    })
    .then(response => response)
    .catch(error => error)
}
function* addComplain(action) {
    console.log('action', action);
    try {
        let Res = yield call(addComplainAsync, action.payload);
        
        if (Res && Res.success === true) {
            yield put(addComplainSuccess({ success: true, message: Res.message }));
            yield put(ToastActionsCreators.displayError('Complain added!'));
            action.payload.callback(Res.success);
        }
        else {
            yield put(addComplainError({ success: false, message: "Unable to Submit! try after some time" }));
        }
    } catch (error) {
        yield put(addComplainError({ success: false, message: "Unable to Submit! try after some time" }));
    }
}

const fetchComplainAsync = async (data) => {
    console.log('aaaadata', data);
    let PropertyMember = Parse.Object.extend("PropertyMemberComplaint");
    let Property = Parse.Object.extend("Property");
    let PropertyPointer = new Property();
    PropertyPointer.id = data;
    let PropertyMemberQry = new Parse.Query(PropertyMember);
    PropertyMemberQry.equalTo("property", PropertyPointer);
    return await PropertyMemberQry.find()
        .then((response) => response)
        .catch((error) => error);



        // let VendorProductCategory = Parse.Object.extend("VendorProductCategory");
        // let Vendor = Parse.Object.extend("Vendor");
        // let VendorPointer = new Vendor();
        // VendorPointer.id = vendorId;
        // let VendorProductCategoryQry = new Parse.Query(VendorProductCategory);
        // VendorProductCategoryQry.equalTo("vendor", VendorPointer);
        // VendorProductCategoryQry.equalTo("status", "ACTIVE");
        // VendorProductCategoryQry.ascending("position");
        // VendorProductCategoryQry.limit(1000);
}
function* fetchComplain(action) {
    console.log('aaaaqq', action);
    try {
        let Res = yield call(fetchComplainAsync, action.payload);
        
        if (Res && Res !== '') {
            console.log('data', Res);
            yield put(fetchComplainSuccess({ success: true, complainList: JSON.parse(JSON.stringify(Res)) }));
            action.payload.callback(Res.success);
        }
        else {
            yield put(fetchComplainError({ success: false }));
        }
    } catch (error) {
        yield put(fetchComplainError({ success: false }));
    }
}

export function* watchAddComplain() {
    yield takeEvery(ADD_COMPLAIN, addComplain);
}
export function* watchFetchComplain() {
    yield takeEvery(FETCH_COMPLAIN, fetchComplain);
}

export default function* rootSaga() {
    yield all([
        fork(watchAddComplain),
        fork(watchFetchComplain),
    ]);
}