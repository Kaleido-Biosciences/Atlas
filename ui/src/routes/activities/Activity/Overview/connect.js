import { connect } from 'react-redux';
import { Overview } from './Overview';
import { activity } from 'store';

const mapState = (state, props) => {
  return {
    plates: activity.selectPlates(state),
    plateTypes: activity.selectPlateTypes(state),
    setPlateTypeError: activity.selectSetPlateTypeError(state),
  };
};

const mapDispatch = {
  onAutoArrangePlates: activity.autoArrangePlates,
  onCloseSetPlateTypeError: activity.clearSetPlateTypeError,
  onCopyPlate: activity.setPlateToCopy,
  onPastePlate: activity.pasteToPlates,
  onPlateSelectionChange: activity.setPlateSelections,
  onSavePlateName: activity.setPlateName,
  onSetPlateType: activity.setPlateType,
  onSwitchToView: activity.setActiveView,
  onUpdatePlateDetails: activity.updatePlateDetails,
};

const connected = connect(mapState, mapDispatch)(Overview);
export { connected as Overview };
