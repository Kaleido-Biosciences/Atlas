import { connect } from 'react-redux';
import queryString from 'query-string';

import { Editor } from './Editor';
import {
  selectActivityContainerImportStatus,
  selectEditorInitialized,
} from '../../../store/selectors';
import {
  importContainerCollection,
  setContainerImportStatus,
} from '../../../store/activitiesActions';
import {
  setInitialized,
  initializePlates,
  addNewPlate,
} from '../../../store/editorActions';
import {
  REQUEST_PENDING,
  REQUEST_SUCCESS,
  REQUEST_ERROR,
} from '../../../constants';

const onMount = query => {
  return async dispatch => {
    const params = queryString.parse(query);
    dispatch(setContainerImportStatus({ status: REQUEST_PENDING }));
    try {
      await dispatch(importContainerCollection(params.status, params.version));
      dispatch(initializePlates());
      dispatch(setContainerImportStatus({ status: REQUEST_SUCCESS }));
      dispatch(setInitialized({ initialized: true }));
    } catch (err) {
      dispatch(setContainerImportStatus({ status: REQUEST_ERROR }));
    }
  };
};

const mapState = (state, props) => {
  const importStatus = selectActivityContainerImportStatus(state);
  const initialized = selectEditorInitialized(state);
  let loading = false,
    error = null;
  if (importStatus === REQUEST_PENDING) {
    loading = true;
  } else if (importStatus === REQUEST_ERROR) {
    error = 'An error occurred while importing plates.';
  }
  return { loading, error, initialized };
};

const mapDispatch = {
  onMount,
  onAddClick: addNewPlate,
};

const connected = connect(mapState, mapDispatch)(Editor);
export { connected as Editor };
