import { connect } from 'react-redux';

import { ApplyTool } from './ApplyTool';
import { addComponentToToolComponents } from '../../../../implementations/kapture-backend/actions/editorActions';
import { actions } from '../../../../implementations/kapture-backend/actions';
import {
  selectEditorToolComponents,
  selectEditorToolComponentsValid,
  selectEditorV2SelectedContainersSummary,
  selectEditorV2ActiveGridId,
} from '../../../../store/selectors';

const { applySelectedToolComponentsToSelectedContainers } = actions.editorV2;

const mapState = (state, props) => {
  return {
    toolComponents: selectEditorToolComponents(state),
    toolComponentsValid: selectEditorToolComponentsValid(state),
    selectedContainersSummary: selectEditorV2SelectedContainersSummary(state),
    activeContainerId: selectEditorV2ActiveGridId(state),
  };
};

const mapDispatch = {
  onApplyClick: applySelectedToolComponentsToSelectedContainers,
  onAddAttribute: addComponentToToolComponents,
};

const connected = connect(mapState, mapDispatch)(ApplyTool);
export { connected as ApplyTool };
