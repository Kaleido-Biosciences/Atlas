import { connect } from 'react-redux';

import { ActivitySearch } from '../../../components';
import { searchActivities, resetState } from '../actions/activitySearchActions';
import {
  selectActivitySearchSearchTerm,
  selectActivitySearchLoading,
  selectActivitySearchError,
  selectActivitySearchResults,
} from '../../../store/selectors';

const onUnmount = () => {
  return resetState();
};

const mapState = (state, props) => {
  return {
    value: selectActivitySearchSearchTerm(state),
    loading: selectActivitySearchLoading(state),
    error: selectActivitySearchError(state),
    results: selectActivitySearchResults(state),
  };
};

const mapDispatch = {
  onChange: searchActivities,
  onUnmount,
};

const connected = connect(mapState, mapDispatch)(ActivitySearch);
export { connected as ActivitySearch };
