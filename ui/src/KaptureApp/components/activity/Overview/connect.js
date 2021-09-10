import { connect } from 'react-redux';
import { Overview } from './Overview';
import { activity } from 'KaptureApp/store';

const mapState = (state, props) => {
  return {};
};

const mapDispatch = {
  onAddPlate: activity.addNewPlates,
  onAddView: activity.addView,
  onSaveGridName: activity.setGridName,
};

const connected = connect(mapState, mapDispatch)(Overview);
export { connected as Overview };
