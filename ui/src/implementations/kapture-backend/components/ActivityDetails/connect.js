import { connect } from 'react-redux';

import { ActivityDetails } from './ActivityDetails';
import { selectors } from '../../store';
import {
  setActivityPlateSize,
  setActivityContainerCollectionsStale,
} from '../../actions';

const {
  selectActivityName,
  selectActivityContainerCollections,
  selectActivityPlateSize,
} = selectors;

const mapState = (state, props) => {
  return {
    activityName: selectActivityName(state),
    versions: selectActivityContainerCollections(state),
    plateSize: selectActivityPlateSize(state),
  };
};

const onUnmount = () => {
  return setActivityContainerCollectionsStale({ stale: true });
};

const mapDispatch = {
  onPlateSizeChange: setActivityPlateSize,
  onUnmount,
};

const connected = connect(mapState, mapDispatch)(ActivityDetails);
export { connected as ActivityDetails };
