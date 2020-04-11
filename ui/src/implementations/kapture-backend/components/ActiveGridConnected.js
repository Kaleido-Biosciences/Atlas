import { connect } from 'react-redux';

import { ActiveGrid } from '../../../components';
import { actions } from '../actions';
import { selectors } from '../store';
import { CONTAINER_TYPE_OPTIONS } from '../config/containerTypes';

const {
  selectEditorActiveGrid,
  selectEditorBarcodes,
  selectEditorSettings,
} = selectors;

const {
  addNewContainerToGrid,
  handleContainerClick,
  setGridBarcode,
  addBarcodes,
  setSettings,
} = actions.editor;

const mapState = (state, props) => {
  return {
    activeGrid: selectEditorActiveGrid(state),
    barcodes: selectEditorBarcodes(state),
    settings: selectEditorSettings(state),
    containerTypeOptions: CONTAINER_TYPE_OPTIONS,
  };
};

const mapDispatch = {
  onContainerClick: handleContainerClick,
  onAddContainer: addNewContainerToGrid,
  onBarcodeSelect: setGridBarcode,
  onBarcodeAdd: addBarcodes,
  onSettingsChange: setSettings,
};

const connected = connect(mapState, mapDispatch)(ActiveGrid);
export { connected as ActiveGrid };
