import { connect } from 'react-redux';

import { ApplyTool } from './ApplyTool';
import {
  applySelectedToolComponentsToSelectedWells,
  addComponentToToolComponents,
} from '../../../../implementations/kapture-backend/actions/editorActions';
import {
  selectEditorToolComponents,
  selectEditorToolComponentsValid,
  selectEditorSelectedWellsFromActivePlate,
  selectEditorActivePlate,
} from '../../../../store/selectors';

const mapState = (state, props) => {
  return {
    toolComponents: selectEditorToolComponents(state),
    toolComponentsValid: selectEditorToolComponentsValid(state),
    selectedWells: selectEditorSelectedWellsFromActivePlate(state),
    activePlate: selectEditorActivePlate(state),
  };
};

const mapDispatch = {
  onApplyClick: applySelectedToolComponentsToSelectedWells,
  onAddAttribute: addComponentToToolComponents,
};

const connected = connect(mapState, mapDispatch)(ApplyTool);
export { connected as ApplyTool };
