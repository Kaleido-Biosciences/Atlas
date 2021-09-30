import { connect } from 'react-redux';
import { Overview } from './Overview';
import { activity } from 'KaptureApp/store';

const mapState = (state, props) => {
  return {};
};

const mapDispatch = {
  onAddView: activity.addView,
  onPlateSelectionChange: activity.setViewPlateSelections,
  onSavePlateName: activity.setPlateName,
  onSetPlateSize: activity.setPlateSize,
};

const connected = connect(mapState, mapDispatch)(Overview);
export { connected as Overview };
