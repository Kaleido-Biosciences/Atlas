import { connect } from 'react-redux';

import { ActivitySearch } from 'AtlasUI/components';
import { actions } from '../actions';
import { selectors } from '../store';

const { searchActivities, resetActivitySearch } = actions.activitySearch;

const {
  selectActivitySearchSearchTerm,
  selectActivitySearchLoading,
  selectActivitySearchError,
  selectActivitySearchResults,
} = selectors;

const onUnmount = () => {
  return resetActivitySearch();
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
