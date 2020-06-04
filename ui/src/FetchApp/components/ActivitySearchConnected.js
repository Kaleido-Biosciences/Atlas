import { connect } from 'react-redux';

import { ActivitySearch } from 'AtlasUI/components';

const mapState = (state, props) => {
  return {};
};

const mapDispatch = {};

const connected = connect(mapState, mapDispatch)(ActivitySearch);
export { connected as ActivitySearch };
