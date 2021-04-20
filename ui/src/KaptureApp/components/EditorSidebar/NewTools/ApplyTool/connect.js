import { connect } from 'react-redux';

import { ApplyTool } from './ApplyTool';
import { tools, editor } from 'KaptureApp/store';

const mapState = (state, props) => {
  return {
    clickMode: tools.selectClickMode(state),
    componentSearchComplete: tools.selectComponentSearchComplete(state),
    componentSearchPending: tools.selectComponentSearchPending(state),
    componentSearchResults: tools.selectComponentSearchResults(state),
    componentSearchTerm: tools.selectComponentSearchTerm(state),
    selectedContainersSummary: editor.selectSelectedContainersSummary(state),
    toolComponents: tools.selectApplyToolComponents(state),
    toolComponentsValid: tools.selectApplyToolComponentsValid(state),
  };
};

const mapDispatch = {
  onAddAttribute: tools.addAttributeToApplyToolComponents,
  onAddToolComponent: tools.addApplyToolComponent,
  onComponentSearchChange: tools.searchComponents,
  onComponentSearchHide: tools.resetComponentSearch,
  onComponentSelectionsChange: tools.updateApplyToolComponentSelections,
  onRemoveToolComponent: tools.removeApplyToolComponents,
  onUpdateToolComponent: tools.updateApplyToolComponent,
  onUnmount: tools.resetComponentSearch,
};

const connected = connect(mapState, mapDispatch)(ApplyTool);
export { connected as ApplyTool };
