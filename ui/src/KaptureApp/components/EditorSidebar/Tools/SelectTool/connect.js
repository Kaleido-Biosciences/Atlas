import { connect } from 'react-redux';

import { SelectTool } from './SelectTool';
import { editor } from 'KaptureApp/store';

const mapState = (state, props) => {
  return {
    activeGridId: editor.selectActiveGridId(state),
    selectedContainersSummary: editor.selectSelectedContainersSummary(state),
  };
};

const mapDispatch = {
  onAllClick: editor.selectAllGridContainers,
  onBorderClick: editor.selectBorderGridContainers,
  onDeselectAllClick: editor.deselectAllGridContainers,
  onInteriorClick: editor.selectInteriorGridContainers,
};

const connected = connect(mapState, mapDispatch)(SelectTool);
export { connected as SelectTool };
