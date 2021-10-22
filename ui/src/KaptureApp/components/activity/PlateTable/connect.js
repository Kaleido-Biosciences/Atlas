import { connect } from 'react-redux';
import { PlateTable } from './PlateTable';
import { activity, tools } from 'KaptureApp/store';

const mapState = (state, props) => {
  return {
    plates: activity.selectPlates(state),
    enableRemoveComponent: tools.selectEnableRemoveComponent(state),
  };
};

const mapDispatch = {
  onPlateChange: activity.setPlateSelections,
  onSaveName: activity.setPlateName,
  onWellClick: tools.handleContainerClick,
};

const connected = connect(mapState, mapDispatch)(PlateTable);
export { connected as PlateTable };
