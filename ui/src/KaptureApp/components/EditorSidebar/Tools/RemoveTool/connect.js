import { connect } from 'react-redux';

import { RemoveTool } from './RemoveTool';
import { COMPONENT_TYPES } from 'KaptureApp/config/componentTypes';
import { tools, editor } from 'KaptureApp/store';

const mapState = (state, props) => {
  return {
    activeGridId: editor.selectActiveGridId(state),
    clickMode: tools.selectClickMode(state),
    componentTypesToRemove: tools.selectComponentTypesToRemove(state),
    componentTypes: COMPONENT_TYPES,
    selectedContainersSummary: editor.selectSelectedContainersSummary(state),
  };
};
const mapDispatch = {
  onChange: tools.setComponentTypesToRemove,
  onRemoveClick: tools.removeComponentsFromSelectedContainers,
};

const connected = connect(mapState, mapDispatch)(RemoveTool);
export { connected as RemoveTool };
