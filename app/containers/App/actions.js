import {
  LOAD,
  CREATE,
  UPDATE,
  DELETE,
  SUCCESS,
  ERROR
} from './constants';

/**
 * Dispatched when the data are loaded by the request saga
 *
 * @param  {array} repos The repository data
 * @param  {string} username The current username
 *
 * @return {object} An action object with a type of SUCCESS passing the repos
 */
export function loadData() {
  return {
    type: LOAD,
  };
}

/**
 * Dispatched when the data successfully gets loaded by saga.
 *
 * @param  {object} data loaded by API
 *
 * @return {object} An action object with a type of SUCCESS passing the data
 */
export function dataLoaded(data) {
  return {
    type: SUCCESS,
    data,
  };
}

/**
 * Dispatched when the resource creation is requested by saga.
 *
 * @param  {object} resource needs to be created.
 *
 * @return {object} An action object with a type of CREATE passing the payload
 */
export function createRecord(data) {
  return {
    type: CREATE,
    payload: data
  };
}

/**
 * Dispatched when the resource updation is requested by saga.
 *
 * @param  {integer} id of resource needs to be updated.
 * @param  {object} resource needs to be updated.
 *
 * @return {object} An action object with a type of UPDATE passing the payload
 */
export function updateRecord(id, data) {
  return {
    type: UPDATE,
    id: id,
    payload: data
  };
}

/**
 * Dispatched when the resource deletion is requested by saga.
 *
 * @param  {integer} id of resource needs to be deleted.
 *
 * @return {object} An action object with a type of DELETE passing the payload
 */
export function deleteRecord(id) {
  return {
    type: DELETE,
    id: id
  };
}

/**
 * Dispatched when the resource updation happens successfully.
 *
 * @param  {object} resource created/updated/deleted.
 *
 * @return {object} An action object with a type of LOAD.
 */
export function updateSuccess(data) {
  return {
    type: LOAD,
  };
}

/**
 * Dispatched when loading the data fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of ERROR passing the error
 */
export function apiError(error) {
  return {
    type: ERROR,
    error,
  };
}
