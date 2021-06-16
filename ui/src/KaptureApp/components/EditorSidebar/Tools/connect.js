import { connect } from 'react-redux';

import { Tools } from './Tools';
import { tools } from 'KaptureApp/store';

const mapState = (state, props) => {
  return {
    activeTool: tools.selectActiveTool(state),
  };
};

const mapDispatch = {
  onToolButtonClick: tools.setActiveTool,
};

const connected = connect(mapState, mapDispatch)(Tools);
export { connected as Tools };
