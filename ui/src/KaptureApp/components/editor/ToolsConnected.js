import { connect } from 'react-redux';

import { Tools } from './Tools';
import { actions } from '../../actions';
import { selectors } from 'KaptureApp/store';

const { setClickMode } = actions.editor;
const { selectEditorClickMode } = selectors;

const mapState = (state, props) => {
  return { clickMode: selectEditorClickMode(state) };
};

const mapDispatch = {
  onToolMenuItemClick: setClickMode,
};

const connected = connect(mapState, mapDispatch)(Tools);
export { connected as Tools };
