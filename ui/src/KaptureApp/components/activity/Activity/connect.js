import { connect } from 'react-redux';
import { Activity } from './Activity';
import { activity } from 'KaptureApp/store';

const mapState = (state, props) => {
  return {
    activeView: activity.selectActiveView(state),
    grids: activity.selectGrids(state),
    views: activity.selectViews(state),
  };
};

const mapDispatch = {
  onAddPlate: activity.addNewPlates,
};

const connected = connect(mapState, mapDispatch)(Activity);
export { connected as Activity };
