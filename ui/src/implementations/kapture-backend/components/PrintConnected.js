import { connect } from 'react-redux';
import queryString from 'query-string';

import { Print } from '../../../components';
import { actions } from '../actions';
import { selectors } from '../store';
import { GRID_TYPES_KEYED } from '../config/containerTypes';

const {
  selectPrintInitialized,
  selectPrintInitializationError,
  selectPrintGrids,
  selectActivityName,
  selectActivityDescription,
} = selectors;
const { loadContainerCollection, resetPrint } = actions.print;

const onMount = (query) => {
  return async (dispatch) => {
    const params = queryString.parse(query);
    dispatch(loadContainerCollection(params.status, params.version));
  };
};

const mapState = (state, props) => {
  const initialized = selectPrintInitialized(state);
  const error = selectPrintInitializationError(state);
  let loading = false;
  if (!initialized && !error) {
    loading = true;
  }
  return {
    loading,
    error,
    initialized,
    grids: selectPrintGrids(state),
    gridTypes: GRID_TYPES_KEYED,
    activityName: selectActivityName(state),
    activityDescription: selectActivityDescription(state),
  };
};

const mapDispatch = {
  onMount,
  onUnmount: resetPrint,
};

const connected = connect(mapState, mapDispatch)(Print);
export { connected as Print };
