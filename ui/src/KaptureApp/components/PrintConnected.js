import { connect } from 'react-redux';
import queryString from 'query-string';

import { Print } from 'AtlasUI/components';
import { activity, selectors } from 'KaptureApp/store';
import { actions } from 'KaptureApp/actions';
import { GRID_TYPES_KEYED } from 'KaptureApp/config/containerTypes';
import { GRID_ROW_HEADERS } from 'KaptureApp/config/grid';

const {
  selectPrintInitialized,
  selectPrintInitializationError,
  selectPrintGrids,
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
    rowHeaders: GRID_ROW_HEADERS,
    activityName: activity.selectName(state),
    activityDescription: activity.selectDescription(state),
  };
};

const mapDispatch = {
  onMount,
  onUnmount: resetPrint,
};

const connected = connect(mapState, mapDispatch)(Print);
export { connected as Print };
