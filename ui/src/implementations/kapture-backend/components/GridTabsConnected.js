import { connect } from 'react-redux';

import { GridTabs } from '../../../components';
import { actions } from '../actions';
import { selectors } from '../store';
import { COMPONENT_TYPES } from '../componentTypes';

const {
  setActiveGridId,
  addNewPlate,
  addNewRack,
  addNewContainer,
  cloneGrid,
  deleteGrid,
} = actions.editorV2;

const { selectEditorGridTabs, selectEditorActiveGridId } = selectors;

const mapState = (state, props) => {
  return {
    tabs: selectEditorGridTabs(state),
    activeGridId: selectEditorActiveGridId(state),
    componentTypes: COMPONENT_TYPES,
  };
};

const mapDispatch = {
  onTabClick: setActiveGridId,
  onAddPlate: addNewPlate,
  onAddRack: addNewRack,
  onAddContainer: addNewContainer,
  onClone: cloneGrid,
  onDelete: deleteGrid,
};

const connected = connect(mapState, mapDispatch)(GridTabs);
export { connected as GridTabs };
