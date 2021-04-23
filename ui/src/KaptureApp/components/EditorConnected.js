import { connect } from 'react-redux';
import queryString from 'query-string';

import { Editor as EditorComponent } from 'AtlasUI/components';
import { activity, editor } from 'KaptureApp/store';
import { actions } from 'KaptureApp/actions';

const { resetEditor } = actions.editor;

const onMount = (query) => {
  return async (dispatch, getState) => {
    const params = queryString.parse(query);
    dispatch(activity.loadContainerCollection(params.status, params.version));
  };
};

const mapState = (state, props) => {
  const initialized = editor.selectInitialized(state);
  const error = editor.selectInitializationError(state);
  const gridCount = editor.selectGridCount(state);
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

const connected = connect(mapState, mapDispatch)(EditorComponent);
export { connected as Editor };
