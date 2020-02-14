import { connect } from 'react-redux';

import { ComponentList } from '../../../components';
import { actions } from '../actions';
import { selectors } from '../store';

const {
  addComponentToComponents,
  addComponentToToolComponents,
} = actions.editor;

const { selectEditorComponents, selectEditorComponentCounts } = selectors;

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
