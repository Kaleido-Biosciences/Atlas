import { connect } from 'react-redux';
import { Activities } from './Activities';
import { activity } from 'KaptureApp/store';

const mapState = (state, props) => {
  return {
    initialized: activity.selectInitialized(state),
    initializationError: activity.selectInitializationError(state),
    loading: activity.selectLoading(state),
  };
};

const mapDispatch = {
  onMount: activity.loadActivity,
  onUnmount: activity.resetActivity,
};

const connected = connect(mapState, mapDispatch)(Activities);
export { connected as Activities };
