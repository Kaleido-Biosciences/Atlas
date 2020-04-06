import { connect } from 'react-redux';

import { ActiveGrid } from '../../../components';
import { actions } from '../actions';
import { selectors } from '../store';

const {
  selectEditorV2ActiveGrid,
  selectEditorV2Barcodes,
  selectEditorV2Settings,
} = selectors;

const {
  addNewContainerToGrid,
  handleContainerClick,
  setGridBarcode,
  addBarcodes,
  setSettings,
} = actions.editorV2;

const mapState = (state, props) => {
  return {
    activeGrid: selectEditorV2ActiveGrid(state),
    barcodes: selectEditorV2Barcodes(state),
    settings: selectEditorV2Settings(state),
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
