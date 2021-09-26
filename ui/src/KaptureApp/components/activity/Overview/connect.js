import { connect } from 'react-redux';
import { Overview } from './Overview';
import { activity } from 'KaptureApp/store';

const mapState = (state, props) => {
  return {};
};

const mapDispatch = {
  onAddView: activity.addView,
  onDeselectAll: activity.setAllViewPlatesSelected,
  onSavePlateName: activity.setPlateName,
  onSelectAll: activity.setAllViewPlatesSelected,
  onSetPlateSize: activity.setPlateSize,
  onTogglePlateSelection: activity.togglePlateSelection,
};

const connected = connect(mapState, mapDispatch)(Overview);
export { connected as Overview };
