import { connect } from 'react-redux';

import { ActivityHeader } from './ActivityHeader';
import { selectActivity } from '../../../store/selectors';

const mapState = (state, props) => {
  const activity = selectActivity(state);
  return { activityName: activity.name, linkUrl: `/activities/${activity.id}` };
};

const connected = connect(mapState, null)(ActivityHeader);
export { connected as ActivityHeader };
