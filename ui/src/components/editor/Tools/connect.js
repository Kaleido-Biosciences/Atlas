import { connect } from 'react-redux';

import { Tools } from './Tools';
import { setClickMode } from '../../../../store/editorActions';
import { selectEditorClickMode } from '../../../../store/selectors';

const mapState = (state, props) => {
  return { clickMode: selectEditorClickMode(state) };
};

const mapDispatch = {
  onToolMenuItemClick: setClickMode,
};

const connected = connect(mapState, mapDispatch)(Tools);
export { connected as Tools };
