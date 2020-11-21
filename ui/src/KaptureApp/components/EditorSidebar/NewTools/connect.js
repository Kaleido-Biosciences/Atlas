import { connect } from 'react-redux';

import { Tools } from './Tools';
import { selectors, actions } from 'KaptureApp/store';

const mapState = (state, props) => {
  return { activeTool: selectors.selectEditorToolsActiveTool(state) };
};

const mapDispatch = {
  onToolButtonClick: actions.editorTools.setActiveTool,
};

const connected = connect(mapState, mapDispatch)(Tools);
export { connected as Tools };
