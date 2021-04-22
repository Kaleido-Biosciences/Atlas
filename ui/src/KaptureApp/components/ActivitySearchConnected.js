import { connect } from 'react-redux';

import { ActivitySearch as ActivitySearchComponent } from 'AtlasUI/components';
import { activitySearch } from 'KaptureApp/store';

const onUnmount = () => {
  return activitySearch.resetActivitySearch();
};

const mapState = (state, props) => {
  return {
    value: activitySearch.selectSearchTerm(state),
    loading: activitySearch.selectLoading(state),
    error: activitySearch.selectError(state),
    results: activitySearch.selectResults(state),
  };
};

const mapDispatch = {
  onChange: activitySearch.searchActivities,
  onUnmount,
};

const connected = connect(mapState, mapDispatch)(ActivitySearchComponent);
export { connected as ActivitySearch };
