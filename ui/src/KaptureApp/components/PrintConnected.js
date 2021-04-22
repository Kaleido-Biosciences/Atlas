import { connect } from 'react-redux';
import queryString from 'query-string';

import { Print as PrintComponent } from 'AtlasUI/components';
import { activity, print } from 'KaptureApp/store';
import { GRID_TYPES_KEYED } from 'KaptureApp/config/containerTypes';
import { GRID_ROW_HEADERS } from 'KaptureApp/config/grid';

const onMount = (query) => {
  return async (dispatch) => {
    const params = queryString.parse(query);
    dispatch(print.loadContainerCollection(params.status, params.version));
  };
};

const mapState = (state, props) => {
  const initialized = print.selectInitialized(state);
  const error = print.selectInitializationError(state);
  let loading = false;
  if (!initialized && !error) {
    loading = true;
  }
  return {
    loading,
    error,
    initialized,
    grids: print.selectGrids(state),
    gridTypes: GRID_TYPES_KEYED,
    rowHeaders: GRID_ROW_HEADERS,
    activityName: activity.selectName(state),
    activityDescription: activity.selectDescription(state),
  };
};

const mapDispatch = {
  onMount,
  onUnmount: print.resetPrint,
};

const connected = connect(mapState, mapDispatch)(PrintComponent);
export { connected as Print };
