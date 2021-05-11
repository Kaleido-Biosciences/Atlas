import { connect } from 'react-redux';

import { ActivityHeader } from './ActivityHeader';
import { activity } from 'KaptureApp/store';

const mapState = (state, props) => {
  return {
    lastSaveTime: activity.selectLastSaveTime(state),
    linkUrl: `/activities/${activity.selectId(state)}`,
    name: activity.selectName(state),
    saveError: activity.selectSaveError(state),
    savePending: activity.selectSavePending(state),
  };
};

const connected = connect(mapState, null)(ActivityHeader);
export { connected as ActivityHeader };
