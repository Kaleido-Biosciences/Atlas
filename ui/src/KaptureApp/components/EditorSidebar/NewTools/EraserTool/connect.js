import { connect } from 'react-redux';

import { EraserTool } from './EraserTool';
import { COMPONENT_TYPES } from 'KaptureApp/config/componentTypes';
import { tools, editor } from 'KaptureApp/store';

const mapState = (state, props) => {
  return {
    clickMode: tools.selectClickMode(state),
    componentTypesToClear: tools.selectComponentTypesToClear(state),
    componentTypes: COMPONENT_TYPES,
    selectedContainersSummary: editor.selectSelectedContainersSummary(state),
  };
};
const mapDispatch = { onChange: tools.setComponentTypesToClear };

const connected = connect(mapState, mapDispatch)(EraserTool);
export { connected as EraserTool };
