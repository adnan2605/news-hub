import { put, takeEvery } from "redux-saga/effects"
import { CREATE_TESTIMONIAL, CREATE_TESTIMONIAL_RED, DELETE_TESTIMONIAL, DELETE_TESTIMONIAL_RED, GET_TESTIMONIAL, GET_TESTIMONIAL_RED, UPDATE_TESTIMONIAL, UPDATE_TESTIMONIAL_RED } from "../Constants"
import { createRecord, deleteRecord, getRecord, updateRecord } from "./Services/index"
// import { createMultipartRecord, createRecord, deleteRecord, getRecord, updateMultipartRecord, updateRecord } from "./Services/index"


function* createSaga(action) {
    let response = yield createRecord("testimonial", action.payload)
    yield put({ type: CREATE_TESTIMONIAL_RED, payload: response })


    // let response = yield createMultipartRecord("testimonial", action.payload)
    // yield put({ type: CREATET_TESTIMONIAL_RED, payload: response })


}
function* getSaga() {
    let response = yield getRecord("testimonial")
    yield put({ type: GET_TESTIMONIAL_RED, payload: response })
}
function* updateSaga(action) {
    yield updateRecord("testimonial", action.payload)
    yield put({ type: UPDATE_TESTIMONIAL_RED, payload: action.payload })



    // let response = yield updateMultipartRecord("testimonial", action.payload)
    // yield put({ type: GET_TESTIMONIAL_RED, payload: response})
}
function* deleteSaga(action) {
    yield deleteRecord("testimonial", action.payload)
    yield put({ type: DELETE_TESTIMONIAL_RED, payload: action.payload })
}


export default function* testimonialSagas() {
    yield takeEvery(CREATE_TESTIMONIAL, createSaga)
    yield takeEvery(GET_TESTIMONIAL, getSaga)
    yield takeEvery(UPDATE_TESTIMONIAL, updateSaga)
    yield takeEvery(DELETE_TESTIMONIAL, deleteSaga)
}