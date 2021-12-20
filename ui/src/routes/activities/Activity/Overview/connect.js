import { connect } from 'react-redux';
import { Overview } from './Overview';
import { activity, importPlates } from 'store';

const mapState = (state, props) => {
  return {
    copyPlateDisabled: activity.selectCopyPlateDisabled(state),
    pastePlateDisabled: activity.selectPastePlateDisabled(state),
    plates: activity.selectPlates(state),
    plateTypes: activity.selectPlateTypes(state),
    selectedPlateIds: activity.selectSelectedPlateIds(state),
    setPlateTypeError: activity.selectSetPlateTypeError(state),
    swapComponentsDisabled: activity.selectSwapComponentsDisabled(state),
  };
};

const mapDispatch = {
  onAutoArrangePlates: activity.autoArrangePlates,
  onCloseSetPlateTypeError: activity.clearSetPlateTypeError,
  onCopyPlate: activity.setPlateIdToCopy,
  onImportModalClose: importPlates.reset,
  onPastePlate: activity.pasteToPlates,
  onPlateDragStop: activity.updatePlateProperties,
  onPlateSelectionChange: activity.setPlateSelections,
  onSavePlateName: activity.setPlateName,
  onSetPlateType: activity.setPlateType,
  onSwapComponents: activity.swapComponents,
  onSwitchToView: activity.setActiveView,
};

const connected = connect(mapState, mapDispatch)(Overview);
export { connected as Overview };
