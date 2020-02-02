import { connect } from 'react-redux';
import { ActivityDetails } from './ActivityDetails';
import {
  setPlateSize,
  setContainerCollectionsStale,
} from '../../../store/activitiesActions';

const mapState = (state, props) => {
  const { activity, plateSize } = state.activities;
  return { activity, versions: activity.containerCollections, plateSize };
};

const onUnmount = () => {
  return setContainerCollectionsStale({ stale: true });
};

const mapDispatch = {
  onPlateSizeChange: setPlateSize,
  onUnmount,
};

const connected = connect(mapState, mapDispatch)(ActivityDetails);
export { connected as ActivityDetails };
