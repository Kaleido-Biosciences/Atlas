import { connect } from 'react-redux';

import { ActivityHeader } from 'AtlasUI/components';
import { selectors } from '../store';

const { selectActivityId, selectActivityName } = selectors;

const mapState = (state, props) => {
  return {
    name: selectActivityName(state),
    linkUrl: `/activities/${selectActivityId(state)}`,
  };
};

const connected = connect(mapState, null)(ActivityHeader);
export { connected as ActivityHeader };
