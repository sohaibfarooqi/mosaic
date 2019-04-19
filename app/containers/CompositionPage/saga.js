import {
  call,
  put,
  takeLatest,
  all
} from 'redux-saga/effects';
import { LOAD, CREATE, UPDATE, DELETE } from 'containers/App/constants';
import { ENDPOINT } from './constants';
import { dataLoaded, apiError, updateSuccess } from 'containers/App/actions';

import request from 'utils/request';

/**
 * Composition GET request/response handler
 */
export function* getComposition() {
  const requestURL = `${process.env.API_URL}/${ENDPOINT}/`;
  try {
    // Call our request helper (see 'utils/request')
    const compositions = yield call(request, requestURL);
    yield put(dataLoaded(compositions));
  } catch (err) {
    yield put(apiError(err));
  }
}

/**
 * Composition POST request/response handler
 */
export function* createComposition(action) {
  const requestURL = `${process.env.API_URL}/${ENDPOINT}/`;
  let reqBody = {
    method: 'POST',
    body: JSON.stringify(action.payload),
    headers: {'Content-Type': 'application/json'}
  }
  try {
    // Call our request helper (see 'utils/request')
    const compositions = yield call(request, requestURL, reqBody);
    yield put(updateSuccess(compositions));
  } catch (err) {
    yield put(apiError(err));
  }
}

/**
 * Composition PUT request/response handler
 */
export function* updateComposition(action) {
  let id = action.id
  const requestURL = `${process.env.API_URL}/${ENDPOINT}/${id}/`;
  let reqBody = {
    method: 'PUT',
    body: JSON.stringify(action.payload),
    headers: {'Content-Type': 'application/json'}
  }
  try {
    // Call our request helper (see 'utils/request')
    const compositions = yield call(request, requestURL, reqBody);
    yield put(updateSuccess(compositions));
  } catch (err) {
    yield put(apiError(err));
  }
}

/**
 * Composition DELETE request/response handler
 */
export function* deleteComposition(action) {
  let id = action.id
  const requestURL = `${process.env.API_URL}/${ENDPOINT}/${id}/`;
  let reqBody = {
    method: 'DELETE',
    headers: {'Content-Type': 'application/json'}
  }
  try {
    // Call our request helper (see 'utils/request')
    const compositions = yield call(request, requestURL, reqBody);
    yield put(updateSuccess(compositions));
  } catch (err) {
    yield put(apiError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* getCompositionData() {
  yield all([
    takeLatest(LOAD, getComposition),
    takeLatest(CREATE, createComposition),
    takeLatest(UPDATE, updateComposition),
    takeLatest(DELETE, deleteComposition),
  ])
}

