import { connect } from 'react-redux';

import { Activities } from './Activities';
import {
  selectActivity,
  selectActivityLoadingStatus,
  selectActivityLoadingError,
  selectActivityInitialized,
  selectActivityContainerImportStatus,
  selectActivityPublishStatus,
  selectActivityPublishedContainerCollectionDetails,
} from '../../store/selectors';
import {
  fetchActivity,
  publishActivityPlates,
} from '../../store/activitiesActions';

const mapState = (state, props) => {
  return {
    activity: selectActivity(state),
    activityInitialized: selectActivityInitialized(state),
    activityLoadingStatus: selectActivityLoadingStatus(state),
    activityLoadingError: selectActivityLoadingError(state),
    activityContainerImportStatus: selectActivityContainerImportStatus(state),
    publishStatus: selectActivityPublishStatus(state),
    publishedContainerCollectionDetails: selectActivityPublishedContainerCollectionDetails(
      state
    ),
  };
};

const mapDispatch = {
  fetchActivity,
  onMarkAsCompleted: publishActivityPlates,
};

const connected = connect(mapState, mapDispatch)(Activities);
export { connected as Activities };
