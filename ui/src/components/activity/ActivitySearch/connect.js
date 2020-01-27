import { connect } from 'react-redux';
import { ActivitySearch } from './ActivitySearch';
import { searchActivities } from '../../../store/activitiesActions';

const mapState = (state, props) => {
  const { searchTerm, searchStatus, searchResults } = state.activities;
  return {
    value: searchTerm,
    requestStatus: searchStatus,
    results: searchResults,
  };
};

const mapDispatch = {
  onChange: searchActivities,
};

const connected = connect(mapState, mapDispatch)(ActivitySearch);
export { connected as ActivitySearch };
