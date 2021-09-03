import { connect } from 'react-redux';
import { Overview } from './Overview';
import { activity, grids } from 'KaptureApp/store';

const mapState = (state, props) => {
  return {
    grids: grids.selectGrids(state),
  };
};

const mapDispatch = {
  onAddPlate: grids.addNewPlates,
  onAddView: activity.addView,
};

const connected = connect(mapState, mapDispatch)(Overview);
export { connected as Overview };
