import { connect } from 'react-redux';
import { ActivityDetails } from './ActivityDetails';
import { setPlateSize, setStale } from '../../../store/activitiesActions';

const mapState = (state, props) => {
  const { activity, plateSize } = state.activities;
  return { versions: activity.containerCollections, plateSize };
};

const onUnmount = () => {
  return setStale({ stale: true });
};

const mapDispatch = {
  onPlateSizeChange: setPlateSize,
  onUnmount,
};

const connected = connect(mapState, mapDispatch)(ActivityDetails);
export { connected as ActivityDetails };
