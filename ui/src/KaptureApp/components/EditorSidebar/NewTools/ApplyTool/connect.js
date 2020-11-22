import { connect } from 'react-redux';

import { ApplyTool } from './ApplyTool';
import { actions } from 'KaptureApp/store';

const mapState = (state, props) => {
  return {};
};

const mapDispatch = {
  onComponentSearchChange: actions.editorTools.searchComponents,
};

const connected = connect(mapState, mapDispatch)(ApplyTool);
export { connected as ApplyTool };
