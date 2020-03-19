import { connect } from 'react-redux';

import { Tools } from '../../../components';
import { actions } from '../actions';
import { selectors } from '../store';

const { setClickMode } = actions.editorV2;
const { selectEditorClickMode } = selectors;

const mapState = (state, props) => {
  return { clickMode: selectEditorClickMode(state) };
};

const mapDispatch = {
  onToolMenuItemClick: setClickMode,
};

const connected = connect(mapState, mapDispatch)(Tools);
export { connected as Tools };
