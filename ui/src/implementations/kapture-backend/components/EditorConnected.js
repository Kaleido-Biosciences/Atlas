import { connect } from 'react-redux';
import queryString from 'query-string';

import { Editor } from '../../../components';
import { selectors } from '../store';
import { actions } from '../actions';

const {
  selectEditorInitialized,
  selectEditorInitializationError,
  selectEditorPlates,
} = selectors;

const { loadContainerCollection, resetEditor, addNewPlate } = actions.editor;

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
  onUnmount: resetEditor,
  onAddClick: addNewPlate,
};

const connected = connect(mapState, mapDispatch)(Editor);
export { connected as Editor };
