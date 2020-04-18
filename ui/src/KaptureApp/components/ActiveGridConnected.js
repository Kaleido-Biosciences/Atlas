import { connect } from 'react-redux';

import { ActiveGrid } from 'AtlasUI/components';
import { actions } from '../actions';
import { selectors } from 'KaptureApp/store';
import { CONTAINER_TYPE_OPTIONS } from '../config/containerTypes';
import { GRID_HEADER_SIZE, GRID_ROW_HEADERS } from '../config/grid';

const {
  selectEditorActiveGrid,
  selectEditorBarcodeOptions,
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
    barcodeOptions: selectEditorBarcodeOptions(state),
    settings: selectEditorSettings(state),
    containerTypeOptions: CONTAINER_TYPE_OPTIONS,
    headerSize: GRID_HEADER_SIZE,
    rowHeaders: GRID_ROW_HEADERS,
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
