import { connect } from 'react-redux';

import { ToolComponent } from './ToolComponent';
import { actions } from '../../../../../actions';

const {
  selectToolComponents,
  deselectToolComponents,
  removeToolComponents,
  addTimepointToComponent,
  updateTimepoint,
  deleteTimepoint,
} = actions.editorTools;

const mapDispatch = {
  onSelect: selectToolComponents,
  onDeselect: deselectToolComponents,
  onRemoveClick: removeToolComponents,
  onAddTimepointClick: addTimepointToComponent,
  onTimepointChange: updateTimepoint,
  onTimepointDeleteClick: deleteTimepoint,
};

const connected = connect(null, mapDispatch)(ToolComponent);
export { connected as ToolComponent };
