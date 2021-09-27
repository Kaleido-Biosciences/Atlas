import { connect } from 'react-redux';
import { Activity } from './Activity';
import { activity, tools } from 'KaptureApp/store';

const mapState = (state, props) => {
  return {
    activeView: activity.selectActiveView(state),
    name: activity.selectName(state),
    views: activity.selectViews(state),
  };
};

const mapDispatch = {
  onWellClick: tools.handleContainerClick,
  onViewTabClick: activity.setActiveView,
};

const connected = connect(mapState, mapDispatch)(Activity);
export { connected as Activity };
