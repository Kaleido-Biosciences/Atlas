import { connect } from 'react-redux';

import { ApplyTool } from './ApplyTool';
import { selectors, editor } from 'KaptureApp/store';
import { actions } from 'KaptureApp/actions';

const {
  selectEditorToolComponents,
  selectEditorToolComponentsValid,
} = selectors;

const { applySelectedToolComponentsToSelectedGrids } = actions.editor;
const { addToolComponent } = actions.editorTools;

const mapState = (state, props) => {
  return {
    toolComponents: selectEditorToolComponents(state),
    toolComponentsValid: selectEditorToolComponentsValid(state),
    selectedContainersSummary: editor.selectSelectedContainersSummary(state),
    activeGridId: editor.selectActiveGridId(state),
  };
};

const mapDispatch = {
  onApplyClick: applySelectedToolComponentsToSelectedGrids,
  onAddAttribute: addToolComponent,
};

const connected = connect(mapState, mapDispatch)(ApplyTool);
export { connected as ApplyTool };
