import { connect } from 'react-redux';

import { ActivityHeader } from './ActivityHeader';
import { activity } from 'KaptureApp/store';

const mapState = (state, props) => {
  return {
    cloneSourceVersion: activity.selectDraftVersion(state),
    lastSaveTime: activity.selectLastSaveTime(state),
    linkUrl: `/activities/${activity.selectId(state)}`,
    name: activity.selectName(state),
    saveError: activity.selectSaveError(state),
    savePending: activity.selectSavePending(state),
  };
};

const mapDispatch = {};

const connected = connect(mapState, mapDispatch)(ActivityHeader);
export { connected as ActivityHeader };
