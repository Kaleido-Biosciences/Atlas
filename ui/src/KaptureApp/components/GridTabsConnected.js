import { connect } from 'react-redux';

import { GridTabs } from 'AtlasUI/components';
import { editor } from 'KaptureApp/store';
import { actions } from 'KaptureApp/actions';
import { COMPONENT_TYPES } from 'KaptureApp/config/componentTypes';
import { CONTAINER_TYPE_OPTIONS } from 'KaptureApp/config/containerTypes';

const { cloneGrid } = actions.editor;

const mapState = (state, props) => {
  return {
    tabs: editor.selectGridTabs(state),
    activeGridId: editor.selectActiveGridId(state),
    componentTypes: COMPONENT_TYPES,
    containerTypeOptions: CONTAINER_TYPE_OPTIONS,
  };
};

const mapDispatch = {
  onTabClick: editor.setActiveGridId,
  onAddPlates: editor.addNewPlates,
  onAddRack: editor.addNewRack,
  onAddContainer: editor.addNewContainer,
  onClone: cloneGrid,
  onDelete: editor.deleteGrid,
};

const connected = connect(mapState, mapDispatch)(GridTabs);
export { connected as GridTabs };
