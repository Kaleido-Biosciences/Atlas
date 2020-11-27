import { connect } from 'react-redux';

import { ApplyTool } from './ApplyTool';
import { tools } from 'KaptureApp/store';

const mapState = (state, props) => {
  return {
    componentSearchComplete: tools.selectApplyToolComponentSearchComplete(
      state
    ),
    componentSearchPending: tools.selectApplyToolComponentSearchPending(state),
    componentSearchResults: tools.selectApplyToolComponentSearchResults(state),
    componentSearchTerm: tools.selectApplyToolComponentSearchTerm(state),
  };
};

const mapDispatch = {
  onAddComponent: tools.addToolComponent,
  onComponentSearchChange: tools.searchComponents,
  onComponentSearchClose: tools.resetComponentSearch,
  onUnmount: tools.resetComponentSearch,
};

const connected = connect(mapState, mapDispatch)(ApplyTool);
export { connected as ApplyTool };
