import { connect } from 'react-redux';

import { EraserTool } from './EraserTool';
import { COMPONENT_TYPES } from 'KaptureApp/config/componentTypes';
import { tools } from 'KaptureApp/store';

const mapState = (state, props) => {
  return {
    componentTypesToClear: tools.selectComponentTypesToClear(state),
    componentTypes: COMPONENT_TYPES,
  };
};
const mapDispatch = { onChange: tools.setComponentTypesToClear };

const connected = connect(mapState, mapDispatch)(EraserTool);
export { connected as EraserTool };
