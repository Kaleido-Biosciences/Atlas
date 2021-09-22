import { connect } from 'react-redux';

import { SelectTool } from './SelectTool';
import { activity } from 'KaptureApp/store';

const mapState = (state, props) => {
  return {
    activeView: activity.selectActiveView(state),
  };
};

const mapDispatch = {
  onAllClick: activity.selectAllGridContainers,
  onBorderClick: activity.selectBorderGridContainers,
  onDeselectAllClick: activity.deselectAllGridContainers,
  onInteriorClick: activity.selectInteriorGridContainers,
};

const connected = connect(mapState, mapDispatch)(SelectTool);
export { connected as SelectTool };
