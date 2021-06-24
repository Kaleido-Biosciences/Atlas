import { connect } from 'react-redux';

import { ActiveGrid } from 'AtlasUI/components';
import { editor, editorImport, tools } from 'KaptureApp/store';
import { CONTAINER_TYPE_OPTIONS } from 'KaptureApp/config/containerTypes';
import { GRID_HEADER_SIZE, GRID_ROW_HEADERS } from 'KaptureApp/config/grid';
import { COMPONENT_TYPES } from 'KaptureApp/config/componentTypes';

const mapState = (state, props) => {
  const enableRemoveComponent =
    tools.selectActiveTool(state) === 'remove' ? true : false;
  return {
    activeGrid: editor.selectActiveGrid(state),
    barcodeOptions: editor.selectBarcodeOptions(state),
    settings: editor.selectSettings(state),
    containerTypeOptions: CONTAINER_TYPE_OPTIONS,
    headerSize: GRID_HEADER_SIZE,
    rowHeaders: GRID_ROW_HEADERS,
    importStarted: editorImport.selectImportStarted(state),
    importPending: editorImport.selectImportPending(state),
    importError: editorImport.selectImportError(state),
    importedComponents: editorImport.selectImportedComponents(state),
    componentImportErrors: editorImport.selectComponentImportErrors(state),
    componentTypes: COMPONENT_TYPES,
    enableRemoveComponent,
  };
};

const mapDispatch = {
  onContainerClick: tools.handleContainerClick,
  onAddContainer: editor.addNewContainerToGrid,
  onBarcodeSelect: editor.setGridBarcode,
  onBarcodeAdd: editor.addBarcodes,
  onSettingsChange: editor.setSettings,
  onImportComponentsClick: editorImport.importComponents,
  onImportApplyClick: editor.applyImportedComponentsToGrid,
  onImportFixClick: editorImport.fixComponent,
  onImportFixAllClick: editorImport.fixAllComponents,
  onImportStartOverClick: editorImport.resetEditorImport,
  onRemoveComponent: tools.removeComponentFromPosition,
};

const connected = connect(mapState, mapDispatch)(ActiveGrid);
export { connected as ActiveGrid };
