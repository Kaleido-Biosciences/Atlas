import { connect } from 'react-redux';

import { ApplyTool } from './ApplyTool';
import {
  applySelectedToolComponentsToSelectedWells,
  addComponentToToolComponents,
} from '../../../../implementations/kapture-backend/actions/editorActions';
import { actions } from '../../../../implementations/kapture-backend/actions';
import {
  selectEditorToolComponents,
  selectEditorToolComponentsValid,
  selectEditorActivePlate,
  selectEditorV2SelectedContainersSummary,
  selectEditorV2ActiveContainerId,
} from '../../../../store/selectors';

const { applySelectedToolComponentsToSelectedContainers } = actions.editorV2;

const mapState = (state, props) => {
  return {
    toolComponents: selectEditorToolComponents(state),
    toolComponentsValid: selectEditorToolComponentsValid(state),
    selectedContainersSummary: selectEditorV2SelectedContainersSummary(state),
    activeContainerId: selectEditorV2ActiveContainerId(state),
  };
};

const mapDispatch = {
  onApplyClick: applySelectedToolComponentsToSelectedContainers,
  onAddAttribute: addComponentToToolComponents,
};

const connected = connect(mapState, mapDispatch)(ApplyTool);
export { connected as ApplyTool };
