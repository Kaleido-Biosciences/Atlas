import { connect } from 'react-redux';

import { ActivityDetails } from './ActivityDetails';
import { selectors } from 'FetchApp/store';
import { actions } from 'FetchApp/actions';

const { loadCollections } = actions.activity;

const mapState = (state, props) => {
  return {};
};

const mapDispatch = {
  onMount: loadCollections,
};

const connected = connect(mapState, mapDispatch)(ActivityDetails);
export { connected as ActivityDetails };
