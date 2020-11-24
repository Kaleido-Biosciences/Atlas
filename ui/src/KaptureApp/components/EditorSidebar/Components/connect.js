import { connect } from 'react-redux';

import { Components } from './Components';
import { selectors } from 'KaptureApp/store';
import { actions } from 'KaptureApp/actions';

const { addToolComponent } = actions.editorTools;
const {
  searchComponents,
  addComponents,
  resetComponents,
  resetImport,
} = actions.editorComponents;
const {
  selectEditorComponentsSearchTerm,
  selectEditorComponentsFilteredComponents,
  selectEditorComponentsSearchPending,
  selectEditorComponentsSearchComplete,
  selectEditorComponentsSearchError,
} = selectors;

const mapState = (state, props) => {
  return {
    filteredComponents: selectEditorComponentsFilteredComponents(state),
    searchTerm: selectEditorComponentsSearchTerm(state),
    searchPending: selectEditorComponentsSearchPending(state),
    searchComplete: selectEditorComponentsSearchComplete(state),
    searchError: selectEditorComponentsSearchError(state),
  };
};

const onComponentClick = (component) => {
  return (dispatch, getState) => {
    dispatch(resetComponents());
    dispatch(addComponents([component]));
    dispatch(addToolComponent(component));
  };
};

const mapDispatch = {
  onComponentClick,
  onSearchChange: searchComponents,
  onImportModalClose: resetImport,
};

const connected = connect(mapState, mapDispatch)(Components);
export { connected as Components };
