import { connect } from 'react-redux';

import { ContainerTabBar } from '../../../components';
import { actions } from '../actions';
import { selectors } from '../store';
import { COMPONENT_TYPES } from '../componentTypes';

const { clonePlate, deletePlate } = actions.editor;
const {
  addNewContainer,
  addNewContainerGrid,
  setActiveContainerId,
  cloneContainer,
} = actions.editorV2;

const {
  selectEditorV2ContainerTabs,
  selectEditorV2ActiveContainerId,
} = selectors;

const mapState = (state, props) => {
  return {
    tabs: selectEditorV2ContainerTabs(state),
    activeContainerId: selectEditorV2ActiveContainerId(state),
    componentTypes: COMPONENT_TYPES,
  };
};

const mapDispatch = {
  onTabClick: setActiveContainerId,
  onClone: cloneContainer,
  // onDelete: deletePlate,
  onAddContainer: addNewContainer,
  onAddContainerGrid: addNewContainerGrid,
};

const connected = connect(mapState, mapDispatch)(ContainerTabBar);
export { connected as ContainerTabBar };
