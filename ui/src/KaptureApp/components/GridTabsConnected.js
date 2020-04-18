import { connect } from 'react-redux';

import { GridTabs } from 'AtlasUI/components';
import { actions } from '../actions';
import { selectors } from 'KaptureApp/store';
import { COMPONENT_TYPES } from '../config/componentTypes';
import { CONTAINER_TYPE_OPTIONS } from '../config/containerTypes';

const {
  setActiveGridId,
  addNewPlate,
  addNewRack,
  addNewContainer,
  cloneGrid,
  deleteGrid,
} = actions.editor;

const { selectEditorGridTabs, selectEditorActiveGridId } = selectors;

const mapState = (state, props) => {
  return {
    tabs: selectEditorGridTabs(state),
    activeGridId: selectEditorActiveGridId(state),
    componentTypes: COMPONENT_TYPES,
    containerTypeOptions: CONTAINER_TYPE_OPTIONS,
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
