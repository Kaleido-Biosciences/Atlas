import { connect } from 'react-redux';

import { ApplyTool } from './ApplyTool';
import { selectors } from 'KaptureApp/store';
import { actions } from 'KaptureApp/actions';

const {
  selectEditorToolComponents,
  selectEditorToolComponentsValid,
  selectEditorSelectedContainersSummary,
  selectEditorActiveGridId,
} = selectors;

const { applySelectedToolComponentsToSelectedGrids } = actions.editor;
const { addToolComponent } = actions.editorTools;

const mapState = (state, props) => {
  return {
    toolComponents: selectEditorToolComponents(state),
    toolComponentsValid: selectEditorToolComponentsValid(state),
    selectedContainersSummary: selectEditorSelectedContainersSummary(state),
    activeGridId: selectEditorActiveGridId(state),
  };
};

const mapDispatch = {
  onApplyClick: applySelectedToolComponentsToSelectedGrids,
  onAddAttribute: addToolComponent,
};

const connected = connect(mapState, mapDispatch)(ApplyTool);
export { connected as ApplyTool };
