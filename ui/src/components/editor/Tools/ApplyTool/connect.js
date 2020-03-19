import { connect } from 'react-redux';

import { ApplyTool } from './ApplyTool';
import {
  applySelectedToolComponentsToSelectedWells,
  addComponentToToolComponents,
} from '../../../../implementations/kapture-backend/actions/editorActions';
import {
  selectEditorToolComponents,
  selectEditorToolComponentsValid,
  selectEditorActivePlate,
  selectEditorV2SelectedContainersSummary,
} from '../../../../store/selectors';

const mapState = (state, props) => {
  return {
    toolComponents: selectEditorToolComponents(state),
    toolComponentsValid: selectEditorToolComponentsValid(state),
    selectedContainersSummary: selectEditorV2SelectedContainersSummary(state),
    activePlate: selectEditorActivePlate(state),
  };
};

const mapDispatch = {
  onApplyClick: applySelectedToolComponentsToSelectedWells,
  onAddAttribute: addComponentToToolComponents,
};

const connected = connect(mapState, mapDispatch)(ApplyTool);
export { connected as ApplyTool };
