import { connect } from 'react-redux';
import { Overview } from './Overview';
import { activity } from 'KaptureApp/store';

const mapState = (state, props) => {
  return {
    grids: activity.selectGrids(state),
  };
};

const mapDispatch = {
  onAddPlate: activity.addNewPlates,
  onAddView: activity.addView,
};

const connected = connect(mapState, mapDispatch)(Overview);
export { connected as Overview };
