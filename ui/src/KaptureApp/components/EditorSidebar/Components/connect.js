import { connect } from 'react-redux';

import { Components } from './Components';
import { components, tools } from 'KaptureApp/store';

const mapState = (state, props) => {
  return {
    filteredComponents: components.selectFilteredComponents(state),
    searchComplete: components.selectSearchComplete(state),
    searchError: components.selectSearchError(state),
    searchPending: components.selectSearchPending(state),
    searchTerm: components.selectSearchTerm(state),
  };
};

const onComponentClick = (component) => {
  return (dispatch, getState) => {
    if (components.selectSearchTerm(getState())) {
      dispatch(components.resetComponentSearch());
      dispatch(components.addComponents([component]));
    }
    dispatch(tools.addApplyToolComponent(component));
  };
};

const mapDispatch = {
  onComponentClick,
  onImportModalClose: components.resetImport,
  onSearchChange: components.searchComponents,
};

const connected = connect(mapState, mapDispatch)(Components);
export { connected as Components };
