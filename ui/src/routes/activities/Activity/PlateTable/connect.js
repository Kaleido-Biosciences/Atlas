import { connect } from 'react-redux';
import { PlateTable } from './PlateTable';
import { activity, tools } from 'store';

const mapState = (state, props) => {
  return {
    plates: activity.selectPlates(state),
    enableRemoveComponent: tools.selectEnableRemoveComponent(state),
  };
};

const mapDispatch = {
  onPlateChange: activity.setPlateSelections,
  onRemoveComponent: activity.removeComponentFromWell,
  onSaveName: activity.setPlateName,
  onWellClick: tools.handleContainerClick,
};

const connected = connect(mapState, mapDispatch)(PlateTable);
export { connected as PlateTable };
