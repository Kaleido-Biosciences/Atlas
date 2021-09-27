import { connect } from 'react-redux';

import { SelectTool } from './SelectTool';
import { activity } from 'KaptureApp/store';

const mapState = (state, props) => {
  return {
    activeView: activity.selectActiveView(state),
  };
};

const mapDispatch = {
  onAllClick: activity.selectAllPlateWells,
  onBorderClick: activity.selectBorderPlateWells,
  onDeselectAllClick: activity.deselectAllPlateWells,
  onInteriorClick: activity.selectInteriorPlateWells,
};

const connected = connect(mapState, mapDispatch)(SelectTool);
export { connected as SelectTool };
