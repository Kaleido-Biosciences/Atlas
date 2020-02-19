import { connect } from 'react-redux';

import { ActivityDetails } from './ActivityDetails';
import { selectors } from '../../store';
import { actions } from '../../actions';

const { setContainerCollectionsStale } = actions.activity;

const { selectActivityName, selectActivityContainerCollections } = selectors;

const mapState = (state, props) => {
  return {
    activityName: selectActivityName(state),
    containerCollections: selectActivityContainerCollections(state),
  };
};

const onUnmount = () => {
  return setContainerCollectionsStale({ stale: true });
};

const mapDispatch = {
  onUnmount,
};

const connected = connect(mapState, mapDispatch)(ActivityDetails);
export { connected as ActivityDetails };
