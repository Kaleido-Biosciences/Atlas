import { connect } from 'react-redux';

import { ApplyTool } from './ApplyTool';
import { actions, selectors } from 'KaptureApp/store';

const mapState = (state, props) => {
  return {
    componentSearchComplete: selectors.selectToolsComponentSearchComplete(
      state
    ),
    componentSearchPending: selectors.selectEditorToolsComponentSearchPending(
      state
    ),
    componentSearchResults: selectors.selectEditorToolsComponentSearchResults(
      state
    ),
    componentSearchTerm: selectors.selectEditorToolsComponentSearchTerm(state),
  };
};

const mapDispatch = {
  onAddComponent: actions.editorTools.addToolComponent,
  onComponentSearchChange: actions.editorTools.searchComponents,
  onComponentSearchClose: actions.editorTools.resetComponentSearch,
  onUnmount: actions.editorTools.resetComponentSearch,
};

const connected = connect(mapState, mapDispatch)(ApplyTool);
export { connected as ApplyTool };
