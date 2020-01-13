import { connect } from 'react-redux';

import { ActivityHeader } from './ActivityHeader';
import { selectActivity } from '../../../store/selectors';

const mapState = (state, props) => {
  return { activity: selectActivity(state) };
};

const connected = connect(mapState, null)(ActivityHeader);
export { connected as ActivityHeader };
