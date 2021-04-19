import { connect } from 'react-redux';

import { ActiveGrid } from 'AtlasUI/components';
import { actions } from 'KaptureApp/actions';
import { selectors, tools } from 'KaptureApp/store';
import { CONTAINER_TYPE_OPTIONS } from 'KaptureApp/config/containerTypes';
import { GRID_HEADER_SIZE, GRID_ROW_HEADERS } from 'KaptureApp/config/grid';

const {
  selectEditorActiveGrid,
  selectEditorBarcodeOptions,
  selectEditorSettings,
  selectEditorImportImportStarted,
  selectEditorImportImportPending,
  selectEditorImportImportError,
  selectEditorImportImportedComponents,
  selectEditorComponentImportErrors,
  selectEditorComponentTypes,
} = selectors;

const {
  addNewContainerToGrid,
  setGridBarcode,
  addBarcodes,
  setSettings,
  applyImportedComponentsToGrid,
} = actions.editor;

const {
  importComponents,
  fixComponent,
  fixAllComponents,
  resetEditorImport,
} = actions.editorImport;

const mapState = (state, props) => {
  return {
    activeGrid: selectEditorActiveGrid(state),
    barcodeOptions: selectEditorBarcodeOptions(state),
    settings: selectEditorSettings(state),
    containerTypeOptions: CONTAINER_TYPE_OPTIONS,
    headerSize: GRID_HEADER_SIZE,
    rowHeaders: GRID_ROW_HEADERS,
    importStarted: selectEditorImportImportStarted(state),
    importPending: selectEditorImportImportPending(state),
    importError: selectEditorImportImportError(state),
    importedComponents: selectEditorImportImportedComponents(state),
    componentImportErrors: selectEditorComponentImportErrors(state),
    componentTypes: selectEditorComponentTypes(state),
  };
};

const mapDispatch = {
  onContainerClick: tools.handleContainerClick,
  onAddContainer: addNewContainerToGrid,
  onBarcodeSelect: setGridBarcode,
  onBarcodeAdd: addBarcodes,
  onSettingsChange: setSettings,
  onImportComponentsClick: importComponents,
  onImportApplyClick: applyImportedComponentsToGrid,
  onImportFixClick: fixComponent,
  onImportFixAllClick: fixAllComponents,
  onImportStartOverClick: resetEditorImport,
};

const connected = connect(mapState, mapDispatch)(ActiveGrid);
export { connected as ActiveGrid };
