import { connect } from 'react-redux';

import { ApplyTool } from './ApplyTool';
import { tools, editor } from 'KaptureApp/store';
import { COMPONENT_TYPES } from 'KaptureApp/config/componentTypes';

const mapState = (state, props) => {
  return {
    activeGridId: editor.selectActiveGridId(state),
    clickMode: tools.selectClickMode(state),
    componentSearchComplete: tools.selectComponentSearchComplete(state),
    componentSearchPending: tools.selectComponentSearchPending(state),
    componentSearchResults: tools.selectComponentSearchResults(state),
    componentSearchTerm: tools.selectComponentSearchTerm(state),
    componentTypes: COMPONENT_TYPES,
    selectedContainersSummary: editor.selectSelectedContainersSummary(state),
    toolComponents: tools.selectApplyToolComponents(state),
    toolComponentsValid: tools.selectApplyToolComponentsValid(state),
  };
};

const mapDispatch = {
  onAddAttribute: tools.addAttributeToApplyToolComponents,
  onAddToolComponent: tools.addApplyToolComponent,
  onApplyClick: tools.applySelectedToolComponentsToSelectedContainers,
  onComponentSearchChange: tools.searchComponents,
  onComponentSearchHide: tools.resetComponentSearch,
  onComponentSelectionsChange: tools.updateApplyToolComponentSelections,
  onRemoveToolComponent: tools.removeApplyToolComponents,
  onUpdateToolComponent: tools.updateApplyToolComponent,
  onUnmount: tools.resetComponentSearch,
};

const connected = connect(mapState, mapDispatch)(ApplyTool);
export { connected as ApplyTool };
