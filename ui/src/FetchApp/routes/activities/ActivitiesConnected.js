import { connect } from 'react-redux';

import { Activities } from './Activities';
import { selectors } from 'FetchApp/store';
import { actions } from 'FetchApp/actions';

const { loadActivity } = actions.activity;

const {
  selectActivityInitialized,
  selectActivityInitializationError,
} = selectors;

const mapState = (state, props) => {
  const initialized = selectActivityInitialized(state);
  const error = selectActivityInitializationError(state);
  let loading = false;
  if (!initialized && !error) {
    loading = true;
  }
  return {
    initialized,
    loading,
    error,
  };
};

const mapDispatch = {
  onMount: loadActivity,
};

const connected = connect(mapState, mapDispatch)(Activities);
export { connected as Activities };
