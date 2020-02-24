import { connect } from 'react-redux';

import { ContainerTabBar } from '../../../components';
import { actions } from '../actions';
import { selectors } from '../store';

const { addNewPlate, setActivePlate, clonePlate, deletePlate } = actions.editor;
const {
  addNewContainer,
  addNewContainerGrid,
  setActiveContainerId,
} = actions.editorV2;

const {
  selectEditorV2Containers,
  selectEditorV2ActiveContainer,
  selectEditorV2ContainerTabs,
} = selectors;

const mapState = (state, props) => {
  const containers = selectEditorV2Containers(state);
  const activeContainer = selectEditorV2ActiveContainer(state);
  return {
    containers,
    activeContainer,
    tabs: selectEditorV2ContainerTabs(state),
  };
};

const mapDispatch = {
  // onAddClick: addNewPlate,
  onTabClick: setActiveContainerId,
  // onClone: clonePlate,
  // onDelete: deletePlate,
  onAddContainer: addNewContainer,
  onAddContainerGrid: addNewContainerGrid,
};

const connected = connect(mapState, mapDispatch)(ContainerTabBar);
export { connected as ContainerTabBar };
