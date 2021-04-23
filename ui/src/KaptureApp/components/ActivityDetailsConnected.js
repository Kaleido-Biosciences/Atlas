import { connect } from 'react-redux';

import { ActivityDetails } from 'AtlasUI/components';
import { activity } from 'KaptureApp/store';

const mapState = (state, props) => {
  return {
    containerCollections: activity.selectContainerCollections(state),
  };
};

const mapDispatch = {
  onUnmount: () => {
    return activity.setContainerCollectionsStale(true);
  },
};

const connected = connect(mapState, mapDispatch)(ActivityDetails);
export { connected as ActivityDetails };
