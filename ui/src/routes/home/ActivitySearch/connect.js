import { connect } from 'react-redux';
import { ActivitySearch as ActivitySearchComponent } from './ActivitySearch';
import { activitySearch } from 'store';

const onUnmount = () => {
  return activitySearch.resetActivitySearch();
};

const mapState = (state, props) => {
  return {
    error: activitySearch.selectError(state),
    loading: activitySearch.selectLoading(state),
    results: activitySearch.selectResults(state),
    value: activitySearch.selectSearchTerm(state),
  };
};

const mapDispatch = {
  onChange: activitySearch.searchActivities,
  onUnmount,
};

const connected = connect(mapState, mapDispatch)(ActivitySearchComponent);
export { connected as ActivitySearch };
