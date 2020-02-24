import { connect } from 'react-redux';
import queryString from 'query-string';

import { EditorV2 } from '../../../components';
import { selectors } from '../store';
import { actions } from '../actions';

const { loadContainerCollection } = actions.editorV2;

const {
  selectEditorV2Initialized,
  selectEditorV2InitializationError,
} = selectors;

const onMount = query => {
  return async (dispatch, getState) => {
    const params = queryString.parse(query);
    dispatch(loadContainerCollection(params.status, params.version));
  };
};

const mapState = (state, props) => {
  const initialized = selectEditorV2Initialized(state);
  const error = selectEditorV2InitializationError(state);
  let loading = false;
  if (!initialized && !error) {
    loading = true;
  }
  return { loading, error, initialized };
};

const mapDispatch = {
  onMount,
};

const connected = connect(mapState, mapDispatch)(EditorV2);
export { connected as EditorV2 };