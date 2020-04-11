import { connect } from 'react-redux';

import { ApplyTool } from './ApplyTool';
import { actions } from '../../../../implementations/kapture-backend/actions';
import {
  selectEditorToolComponents,
  selectEditorToolComponentsValid,
  selectEditorSelectedContainersSummary,
  selectEditorActiveGridId,
} from '../../../../store/selectors';

const { applySelectedToolComponentsToSelectedGrids } = actions.editorV2;
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
