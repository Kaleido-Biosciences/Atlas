import { connect } from 'react-redux';

import { ApplyTool } from './ApplyTool';
import { tools, activity } from 'KaptureApp/store';
import { COMPONENT_TYPES } from 'KaptureApp/config/componentTypes';

const mapState = (state, props) => {
  return {
    activeView: activity.selectActiveView(state),
    componentSearchComplete: tools.selectComponentSearchComplete(state),
    componentSearchPending: tools.selectComponentSearchPending(state),
    componentSearchResults: tools.selectComponentSearchResults(state),
    componentSearchTerm: tools.selectComponentSearchTerm(state),
    componentTypes: COMPONENT_TYPES,
    concentrationUnits: tools.selectConcentrationUnits(state),
    plates: activity.selectPlates(state),
    timeUnits: tools.selectTimeUnits(state),
    toolComponents: tools.selectApplyToolComponents(state),
    toolComponentsValid: tools.selectApplyToolComponentsValid(state),
  };
};

const mapDispatch = {
  onAddAttribute: tools.addAttributeToApplyToolComponents,
  onAddToolComponent: tools.addApplyToolComponent,
  onApplyClick: tools.applySelectedToolComponentsToSelectedWells,
  onComponentSearchChange: tools.searchComponents,
  onComponentSearchHide: tools.resetComponentSearch,
  onComponentSelectionsChange: tools.updateApplyToolComponentSelections,
  onRemoveToolComponent: tools.removeApplyToolComponents,
  onToolComponentEditClick: tools.toggleComponentDisplayEditForm,
  onUpdateToolComponent: tools.updateApplyToolComponent,
  onUnmount: tools.resetComponentSearch,
};

const connected = connect(mapState, mapDispatch)(ApplyTool);
export { connected as ApplyTool };
