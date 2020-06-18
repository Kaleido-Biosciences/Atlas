import { createSelector } from 'redux-starter-kit';

import { selectors } from 'AtlasUI/store';

const kaptureSelectors = {
  ...selectors,
  selectEditorComponents: createSelector(['editorComponents.components']),
  selectEditorToolComponents: createSelector(['editorTools.toolComponents']),
  selectEditorToolComponentsValid: createSelector([
    'editorTools.toolComponentsValid',
  ]),
  selectEditorClickMode: createSelector(['editorTools.clickMode']),
  selectEditorComponentTypesToClear: createSelector([
    'editorTools.componentTypesToClear',
  ]),
  selectEditorSelectedToolComponents: createSelector(
    ['editorTools.toolComponents'],
    (toolComponents) => {
      return toolComponents.filter((component) => component.selected);
    }
  ),
  selectEditorImportImportStarted: createSelector([
    'editorImport.importStarted',
  ]),
  selectEditorImportImportPending: createSelector([
    'editorImport.importPending',
  ]),
  selectEditorImportImportError: createSelector(['editorImport.importError']),
  selectEditorImportImportedComponents: createSelector([
    'editorImport.importedComponents',
  ]),
  selectEditorComponentImportErrors: createSelector([
    'editorImport.componentImportErrors',
  ]),
};

export { kaptureSelectors as selectors };
