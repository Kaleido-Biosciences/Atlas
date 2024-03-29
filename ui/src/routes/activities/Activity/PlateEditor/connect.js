import { connect } from 'react-redux';
import { PlateEditor } from './PlateEditor';
import { activity, tools } from 'store';

const mapState = (state, props) => {
  return {
    plates: activity.selectPlates(state),
    enableRemoveComponent: tools.selectEnableRemoveComponent(state),
  };
};

const mapDispatch = {
  onGridClick: tools.handleContainerClick,
  onPlateChange: activity.setPlateSelections,
  onRemoveComponent: activity.removeComponentFromWell,
  onSaveName: activity.setPlateName,
  onUpdateViewData: activity.updateViewData,
};

const connected = connect(mapState, mapDispatch)(PlateEditor);
export { connected as PlateEditor };
