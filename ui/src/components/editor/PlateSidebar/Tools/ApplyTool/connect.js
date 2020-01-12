import { connect } from 'react-redux';

import { ApplyTool } from './ApplyTool';
import {
  applySelectedToolComponentsToSelectedWells,
  addComponentToToolComponents,
} from '../../../../../store/editorActions';
import {
  selectEditorToolComponents,
  selectEditorToolComponentsValid,
  selectSelectedWellsFromActivePlate,
  selectActivePlate,
} from '../../../../../store/selectors';

const mapState = (state, props) => {
  return {
    toolComponents: selectEditorToolComponents(state),
    toolComponentsValid: selectEditorToolComponentsValid(state),
    selectedWells: selectSelectedWellsFromActivePlate(state),
    activePlate: selectActivePlate(state),
  };
};

const mapDispatch = {
  onApplyClick: applySelectedToolComponentsToSelectedWells,
  onAddAttribute: addComponentToToolComponents,
};

const connected = connect(mapState, mapDispatch)(ApplyTool);
export { connected as ApplyTool };
