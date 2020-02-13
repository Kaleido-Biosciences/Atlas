import { connect } from 'react-redux';

import { ToolComponent } from './ToolComponent';
import {
  selectToolComponents,
  deselectToolComponents,
  removeToolComponents,
  addTimepointToComponent,
  updateTimepoint,
  deleteTimepoint,
} from '../../../../../../store/editorActions';

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
