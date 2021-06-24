import { connect } from 'react-redux';

import { CloneActivityModal } from './CloneActivityModal';
import { activity, activitySearch } from 'KaptureApp/store';

const onReset = () => {
  return (dispatch, getState) => {
    dispatch(activitySearch.resetActivitySearch());
    dispatch(activity.resetCloneState());
  };
};

const mapState = (state, props) => {
  return {
    activitySearchError: activitySearch.selectError(state),
    activitySearchLoading: activitySearch.selectLoading(state),
    activitySearchResults: activitySearch.selectResults(state),
    activitySearchValue: activitySearch.selectSearchTerm(state),
    cloneSourceName: activity.selectName(state),
    cloneSourceVersion: activity.selectDraftVersion(state),
    cloneStatus: activity.selectCloneStatus(state),
    cloneTargetId: activity.selectCloneTargetId(state),
    cloneTargetName: activity.selectCloneTargetName(state),
    cloneTargetVersion: activity.selectCloneTargetVersion(state),
    cloneTargetVersionFetchStatus:
      activity.selectCloneTargetVersionFetchStatus(state),
  };
};

const mapDispatch = {
  onActivitySearchChange: activitySearch.searchActivities,
  onActivitySelect: activity.setCloneTarget,
  onClone: activity.cloneActivity,
  onReset,
};

const connected = connect(mapState, mapDispatch)(CloneActivityModal);
export { connected as CloneActivityModal };
