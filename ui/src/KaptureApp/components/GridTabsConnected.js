import { connect } from 'react-redux';

import { GridTabs } from 'AtlasUI/components';
import { selectors } from 'KaptureApp/store';
import { actions } from 'KaptureApp/actions';
import { COMPONENT_TYPES } from 'KaptureApp/config/componentTypes';
import { CONTAINER_TYPE_OPTIONS } from 'KaptureApp/config/containerTypes';

const {
  setActiveGridId,
  addNewPlates,
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
  onAddPlates: addNewPlates,
  onAddRack: addNewRack,
  onAddContainer: addNewContainer,
  onClone: cloneGrid,
  onDelete: deleteGrid,
};

const connected = connect(mapState, mapDispatch)(GridTabs);
export { connected as GridTabs };
