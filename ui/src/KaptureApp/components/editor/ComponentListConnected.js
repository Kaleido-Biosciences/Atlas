import { connect } from 'react-redux';

import { ComponentList } from './ComponentList';
import { selectors } from 'KaptureApp/store';
import { actions } from 'KaptureApp/actions';

const { addComponentToToolComponents } = actions.editorTools;
const {
  searchComponents,
  addComponentToComponents,
  resetComponents,
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
    dispatch(addComponentToComponents({ component }));
    dispatch(addComponentToToolComponents({ component }));
  };
};

const mapDispatch = {
  onComponentClick,
  onSearchChange: searchComponents,
};

const connected = connect(mapState, mapDispatch)(ComponentList);
export { connected as ComponentList };
