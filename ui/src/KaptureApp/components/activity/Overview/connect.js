import { connect } from 'react-redux';
import { Overview } from './Overview';
import { activity } from 'KaptureApp/store';

const mapState = (state, props) => {
  return { plateTypes: activity.selectPlateTypes(state) };
};

const mapDispatch = {
  onAddView: activity.addView,
  onCopyPlate: activity.setPlateToCopy,
  onPastePlate: activity.pasteToPlates,
  onPlateSelectionChange: activity.setViewPlateSelections,
  onSavePlateName: activity.setPlateName,
  onSetPlateType: activity.setPlateType,
  onUpdatePlateDetails: activity.updatePlateDetails,
};

const connected = connect(mapState, mapDispatch)(Overview);
export { connected as Overview };
