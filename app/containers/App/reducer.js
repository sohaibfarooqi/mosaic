/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */

import { fromJS , List} from 'immutable';

import { LOAD, CREATE, CREATED, UPDATE, DELETE, SUCCESS, ERROR } from './constants';

// The initial state of the App
const initialState = fromJS({
  loading: false,
  error: false,
  data: false,
  success: false,
  payload: false,
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD:
      return state
        .set('loading', true)
        .set('error', false)
        .set('data', []);
      case DELETE:
        return state
        .set('loading', true)
        .set('error', false)
        .set('id', action.id)
      case CREATE:
        return state
        .set('loading', true)
        .set('error', false)
        .set('payload', action.payload);
    case UPDATE:
        return state
        .set('loading', true)
        .set('error', false)
        .set('id', action.id)
        .set('payload', action.payload);
    case SUCCESS:
      return state
        .set('loading', false)
        .set('data', action.data)
    case ERROR:
      return state
        .set('error', action.error)
        .set('loading', false);
    default:
      return state;
  }
}

export default appReducer;
