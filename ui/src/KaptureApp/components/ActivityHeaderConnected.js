import { connect } from 'react-redux';

import { ActivityHeader } from 'AtlasUI/components';
import { activity } from 'KaptureApp/store';

const mapState = (state, props) => {
  return {
    name: activity.selectName(state),
    linkUrl: `/activities/${activity.selectId(state)}`,
  };
};

const connected = connect(mapState, null)(ActivityHeader);
export { connected as ActivityHeader };
