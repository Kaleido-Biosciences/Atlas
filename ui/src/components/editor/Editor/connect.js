import { connect } from 'react-redux';
import queryString from 'query-string';

import { Editor } from './Editor';
import {
  selectActivityContainerImportStatus,
  selectEditorInitialized,
  selectActivityPlateSize,
  selectEditorPlates,
} from '../../../store/selectors';
import {
  importContainerCollection,
  setContainerImportStatus,
} from '../../../store/activitiesActions';
import {
  setInitialized,
  initializePlates,
  addNewPlate,
  setPlates,
  setPlateSize,
} from '../../../store/editorActions';
import {
  REQUEST_PENDING,
  REQUEST_SUCCESS,
  REQUEST_ERROR,
} from '../../../constants';

const onMount = query => {
  return async (dispatch, getState) => {
    dispatch(setContainerImportStatus({ status: REQUEST_PENDING }));
    const params = queryString.parse(query);
    try {
      const plates = await dispatch(
        importContainerCollection(params.status, params.version)
      );
      if (plates.length) {
        dispatch(setPlates({ plates }));
      } else {
        const plateSize = selectActivityPlateSize(getState());
        dispatch(setPlateSize({ plateSize }));
      }
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
  const plates = selectEditorPlates(state);
  let loading = false,
    error = null;
  if (importStatus === REQUEST_PENDING) {
    loading = true;
  } else if (importStatus === REQUEST_ERROR) {
    error = 'An error occurred while importing plates.';
  }
  return { loading, error, initialized, noPlates: plates.length === 0 };
};

const mapDispatch = {
  onMount,
  onAddClick: addNewPlate,
};

const connected = connect(mapState, mapDispatch)(Editor);
export { connected as Editor };
