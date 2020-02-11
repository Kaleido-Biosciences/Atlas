import { connect } from 'react-redux';

import { ActivityDetails } from './ActivityDetails';
import { selectors } from '../../store';
import { actions } from '../../actions';

const { setPlateSize, setContainerCollectionsStale } = actions.activity;

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
  return setContainerCollectionsStale({ stale: true });
};

const mapDispatch = {
  onPlateSizeChange: setPlateSize,
  onUnmount,
};

const connected = connect(mapState, mapDispatch)(ActivityDetails);
export { connected as ActivityDetails };
