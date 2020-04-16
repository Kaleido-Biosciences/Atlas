import { connect } from 'react-redux';

import { ApplyTool } from './ApplyTool';
import { actions } from '../../../../implementations/kapture-backend/actions';
import { selectors } from 'AtlasUI/store';

const {
  selectEditorToolComponents,
  selectEditorToolComponentsValid,
  selectEditorSelectedContainersSummary,
  selectEditorActiveGridId,
} = selectors;

const { applySelectedToolComponentsToSelectedGrids } = actions.editor;
const { addComponentToToolComponents } = actions.editorTools;

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
  onAddAttribute: addComponentToToolComponents,
};

const connected = connect(mapState, mapDispatch)(ApplyTool);
export { connected as ApplyTool };
