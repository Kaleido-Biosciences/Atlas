import { connect } from 'react-redux';

import { ActiveGrid } from 'AtlasUI/components';
import { actions } from 'KaptureApp/actions';
import { editor, editorImport, tools } from 'KaptureApp/store';
import { CONTAINER_TYPE_OPTIONS } from 'KaptureApp/config/containerTypes';
import { GRID_HEADER_SIZE, GRID_ROW_HEADERS } from 'KaptureApp/config/grid';
import { COMPONENT_TYPES } from 'KaptureApp/config/componentTypes';

const { setSettings } = actions.editor;

const mapState = (state, props) => {
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
  };
};

const mapDispatch = {
  onContainerClick: tools.handleContainerClick,
  onAddContainer: editor.addNewContainerToGrid,
  onBarcodeSelect: editor.setGridBarcode,
  onBarcodeAdd: editor.addBarcodes,
  onSettingsChange: setSettings,
  onImportComponentsClick: editorImport.importComponents,
  onImportApplyClick: editor.applyImportedComponentsToGrid,
  onImportFixClick: editorImport.fixComponent,
  onImportFixAllClick: editorImport.fixAllComponents,
  onImportStartOverClick: editorImport.resetEditorImport,
};

const connected = connect(mapState, mapDispatch)(ActiveGrid);
export { connected as ActiveGrid };
