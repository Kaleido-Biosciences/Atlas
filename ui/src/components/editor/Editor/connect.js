import { connect } from 'react-redux';
import queryString from 'query-string';

import { Editor } from './Editor';
import { selectActivePlate } from '../../../store/selectors';
import {
  importContainerCollection,
  setImportStatus,
} from '../../../store/activitiesActions';
import { setInitialized } from '../../../store/editorActions';
import { initializePlates, addNewPlate } from '../../../store/designActions';
import {
  REQUEST_PENDING,
  REQUEST_SUCCESS,
  REQUEST_ERROR,
} from '../../../constants';

const onMount = query => {
  return async dispatch => {
    const params = queryString.parse(query);
    dispatch(setImportStatus({ status: REQUEST_PENDING }));
    try {
      await dispatch(importContainerCollection(params.status, params.version));
      dispatch(initializePlates());
      dispatch(setImportStatus({ status: REQUEST_SUCCESS }));
      dispatch(setInitialized({ initialized: true }));
    } catch {
      dispatch(setImportStatus({ status: REQUEST_ERROR }));
    }
  };
};

const mapState = (state, props) => {
  const { importStatus } = state.activities;
  const { initialized } = state.editor;
  const { plates } = state.designExperiment;
  const activePlate = selectActivePlate(state);
  let loading = false,
    error = null;
  if (importStatus === REQUEST_PENDING) {
    loading = true;
  } else if (importStatus === REQUEST_ERROR) {
    error = 'An error occurred while importing plates.';
  }
  return { plates, activePlate, loading, error, initialized };
};

const mapDispatch = {
  onMount,
  onAddClick: addNewPlate,
};

const connected = connect(mapState, mapDispatch)(Editor);
export { connected as Editor };
