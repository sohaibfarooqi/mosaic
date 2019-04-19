/**
 * The global state selectors
 */

import { createSelector } from 'reselect';

const selectGlobal = state => state.get('global');

const selectRouter = state => state.get('router');

const makeSelectLoading = () =>
  createSelector(selectGlobal, globalState => globalState.get('loading'));

const makeSelectError = () =>
  createSelector(selectGlobal, globalState => globalState.get('error'));

const makeSelectSuccess = () =>
  createSelector(selectGlobal, globalState => globalState.get('success'));

const makeSelectData = () =>
  createSelector(selectGlobal, globalState => globalState.get('data'));

const makeSelectLocation = () =>
  createSelector(selectRouter, routerState =>
    routerState.get('location').toJS(),
  );

export {
  selectGlobal,
  makeSelectLoading,
  makeSelectError,
  makeSelectSuccess,
  makeSelectData,
  makeSelectLocation,
};
