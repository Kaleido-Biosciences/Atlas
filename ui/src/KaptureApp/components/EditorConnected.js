import { connect } from 'react-redux';
import queryString from 'query-string';

import { Editor } from 'AtlasUI/components';
import { selectors } from 'KaptureApp/store';
import { actions } from 'KaptureApp/actions';

const { loadContainerCollection, resetEditor } = actions.editor;

const {
  selectEditorInitialized,
  selectEditorInitializationError,
  selectEditorGridCount,
} = selectors;

const onMount = (query) => {
  return async (dispatch, getState) => {
    const params = queryString.parse(query);
    dispatch(loadContainerCollection(params.status, params.version));
  };
};

const mapState = (state, props) => {
  const initialized = selectEditorInitialized(state);
  const error = selectEditorInitializationError(state);
  const gridCount = selectEditorGridCount(state);
  const showEmptyState = gridCount ? false : true;
  let loading = false;
  if (!initialized && !error) {
    loading = true;
  }
  return { loading, error, initialized, showEmptyState };
};

const mapDispatch = {
  onMount,
  onUnmount: resetEditor,
};

const connected = connect(mapState, mapDispatch)(Editor);
export { connected as Editor };
