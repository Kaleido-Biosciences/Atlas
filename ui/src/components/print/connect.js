import { connect } from 'react-redux';
import queryString from 'query-string';

import { Print } from './Print';
import {
  selectActivityName,
  selectActivityDescription,
  selectActivityContainerImportStatus,
  selectPrintInitialized,
  selectPrintPlates,
} from '../../store/selectors';
import {
  importContainerCollection,
  setContainerImportStatus,
} from '../../store/activitiesActions';
import { setInitialized } from '../../store/printActions';
import {
  REQUEST_PENDING,
  REQUEST_SUCCESS,
  REQUEST_ERROR,
} from '../../constants';

const onMount = query => {
  return async dispatch => {
    const params = queryString.parse(query);
    dispatch(setContainerImportStatus({ status: REQUEST_PENDING }));
    try {
      await dispatch(
        importContainerCollection(params.status, params.version, 'print')
      );
      dispatch(setContainerImportStatus({ status: REQUEST_SUCCESS }));
      dispatch(setInitialized({ initialized: true }));
    } catch (err) {
      dispatch(setContainerImportStatus({ status: REQUEST_ERROR }));
    }
  };
};

const mapState = (state, props) => {
  const importStatus = selectActivityContainerImportStatus(state);
  const initialized = selectPrintInitialized(state);
  let loading = false,
    error = null;
  if (importStatus === REQUEST_PENDING) {
    loading = true;
  } else if (importStatus === REQUEST_ERROR) {
    error = 'An error occurred while importing plates.';
  }
  return {
    loading,
    error,
    initialized,
    activityName: selectActivityName(state),
    activityDescription: selectActivityDescription(state),
    plates: selectPrintPlates(state),
  };
};

const mapDispatch = {
  onMount,
};

const connected = connect(mapState, mapDispatch)(Print);
export { connected as Print };
