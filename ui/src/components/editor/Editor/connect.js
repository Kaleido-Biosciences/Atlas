import { connect } from 'react-redux';
import queryString from 'query-string';

import { Editor } from './Editor';
import {
  selectEditorInitialized,
  selectEditorInitializationError,
  selectEditorPlates,
} from '../../../store/selectors';
import {
  loadContainerCollection,
  resetState,
  addNewPlate,
} from '../../../store/editorActions';

const onMount = query => {
  return async (dispatch, getState) => {
    const params = queryString.parse(query);
    dispatch(loadContainerCollection(params.status, params.version));
  };
};

const mapState = (state, props) => {
  const initialized = selectEditorInitialized(state);
  const error = selectEditorInitializationError(state);
  const plates = selectEditorPlates(state);
  const noPlates = plates.length === 0;
  let loading = false;
  if (!initialized && !error) {
    loading = true;
  }
  return { loading, error, initialized, noPlates };
};

const mapDispatch = {
  onMount,
  onUnmount: resetState,
  onAddClick: addNewPlate,
};

const connected = connect(mapState, mapDispatch)(Editor);
export { connected as Editor };
