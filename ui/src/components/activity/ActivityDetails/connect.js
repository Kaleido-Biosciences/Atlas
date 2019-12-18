import { connect } from 'react-redux';
import { ActivityDetails } from './ActivityDetails';
import { setPlateSize } from '../../../store/activitiesActions';

const mapState = (state, props) => {
  const { activity, plateSize } = state.activities;
  return { versions: activity.containerCollections, plateSize };
};

const mapDispatch = {
  onPlateSizeChange: setPlateSize,
};

const connected = connect(mapState, mapDispatch)(ActivityDetails);
export { connected as ActivityDetails };
