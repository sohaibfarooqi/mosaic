import {
  call,
  put,
  takeLatest,
  all
} from 'redux-saga/effects';
import { LOAD, CREATE, UPDATE, DELETE } from 'containers/App/constants';
import { ENDPOINT } from './constants';
import { loadData, dataLoaded, apiError, updateSuccess } from 'containers/App/actions';

import request from 'utils/request';

/**
 * Recording GET request/response handler
 */
export function* getRecording() {
  const requestURL = `http://localhost:8000/recording/`;
  try {
    // Call our request helper (see 'utils/request')
    const recordings = yield call(request, requestURL);
    yield put(dataLoaded(recordings));
  } catch (err) {
    yield put(apiError(err));
  }
}

/**
 * Recording POST request/response handler
 */
export function* createRecording(action) {
  const requestURL = `http://localhost:8000/recording/`;
  let reqBody = {
    method: 'POST',
    body: JSON.stringify(action.payload),
    headers: {'Content-Type': 'application/json'}
  }
  try {
    // Call our request helper (see 'utils/request')
    const recordings = yield call(request, requestURL, reqBody);
    yield put(updateSuccess(recordings));
  } catch (err) {
    yield put(apiError(err));
  }
}

/**
 * Recording PUT request/response handler
 */
export function* updateRecording(action) {
  let id = action.id
  const requestURL = `http://localhost:8000/recording/${id}/`;
  let reqBody = {
    method: 'PUT',
    body: JSON.stringify(action.payload),
    headers: {'Content-Type': 'application/json'}
  }
  try {
    // Call our request helper (see 'utils/request')
    const recordings = yield call(request, requestURL, reqBody);
    yield put(updateSuccess(recordings));
  } catch (err) {
    yield put(apiError(err));
  }
}

/**
 * Recording DELETE request/response handler
 */
export function* deleteRecording(action) {
  let id = action.id
  const requestURL = `http://localhost:8000/recording/${id}/`;
  let reqBody = {
    method: 'DELETE',
    headers: {'Content-Type': 'application/json'}
  }
  try {
    // Call our request helper (see 'utils/request')
    const recordings = yield call(request, requestURL, reqBody);
    yield put(updateSuccess(recordings));
  } catch (err) {
    yield put(apiError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* manageRecording() {
  yield all([
    takeLatest(LOAD, getRecording),
    takeLatest(CREATE, createRecording),
    takeLatest(UPDATE, updateRecording),
    takeLatest(DELETE, deleteRecording),
  ])
}

