import { connect } from 'react-redux';

import { RemoveTool } from './RemoveTool';
import { COMPONENT_TYPES } from 'KaptureApp/config/componentTypes';
import { activity, tools } from 'KaptureApp/store';

const mapState = (state, props) => {
  return {
    activeView: activity.selectActiveView(state),
    componentTypes: COMPONENT_TYPES,
    componentTypesToRemove: tools.selectComponentTypesToRemove(state),
    plates: activity.selectPlates(state),
  };
};
const mapDispatch = {
  onRemoveClick: tools.removeComponentTypesFromSelectedWells,
  onSelectionChange: tools.setComponentTypesToRemove,
};

const connected = connect(mapState, mapDispatch)(RemoveTool);
export { connected as RemoveTool };
