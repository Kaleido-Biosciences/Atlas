import { connect } from 'react-redux';
import queryString from 'query-string';

import { EditorV2 } from '../../../components';
import { selectors } from '../store';
import { actions } from '../actions';

const { loadContainerCollection, resetEditorV2 } = actions.editorV2;

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
  onUnmount: resetEditorV2,
};

const connected = connect(mapState, mapDispatch)(EditorV2);
export { connected as EditorV2 };
