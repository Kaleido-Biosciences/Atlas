import { connect } from 'react-redux';

import { ApplyTool } from './ApplyTool';
import { tools } from 'KaptureApp/store';

const mapState = (state, props) => {
  return {
    componentSearchComplete: tools.selectComponentSearchComplete(state),
    componentSearchPending: tools.selectComponentSearchPending(state),
    componentSearchResults: tools.selectComponentSearchResults(state),
    componentSearchTerm: tools.selectComponentSearchTerm(state),
    toolComponents: tools.selectApplyToolComponents(state),
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
