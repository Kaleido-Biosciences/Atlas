import { connect } from 'react-redux';

import { ActivityDetails } from './ActivityDetails';
import {
  selectActivity,
  selectActivityContainerCollections,
  selectActivityPlateSize,
} from '../../../store/selectors';
import {
  setPlateSize,
  setContainerCollectionsStale,
} from '../../../store/activitiesActions';

const mapState = (state, props) => {
  return {
    activity: selectActivity(state),
    versions: selectActivityContainerCollections(state),
    plateSize: selectActivityPlateSize(state),
  };
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
