import { connect } from 'react-redux';
import { RemoveTool } from './RemoveTool';
import { ComponentService } from 'services/ComponentService';
import { activity, tools } from 'store';

const mapState = (state, props) => {
  return {
    activeView: activity.selectActiveView(state),
    componentTypes: ComponentService.getAllTypes(),
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
