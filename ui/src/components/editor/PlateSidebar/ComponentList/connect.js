import { connect } from 'react-redux';

import { ComponentList } from './ComponentList';
import {
  addComponentToComponents,
  addComponentToToolComponents,
} from '../../../../store/editorActions';
import {
  selectEditorComponents,
  selectEditorComponentCounts,
} from '../../../../store/selectors';

const onComponentClick = ({ component }) => {
  return (dispatch, getState) => {
    dispatch(addComponentToComponents({ component }));
    dispatch(addComponentToToolComponents({ component }));
  };
};

const mapState = (state, props) => {
  return {
    components: selectEditorComponents(state),
    componentCounts: selectEditorComponentCounts(state),
  };
};

const mapDispatch = {
  onComponentClick,
};

const connected = connect(mapState, mapDispatch)(ComponentList);
export { connected as ComponentList };
