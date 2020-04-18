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
  selectEditorClearMode: createSelector(['editorTools.clearMode']),
  selectEditorSelectedToolComponents: createSelector(
    ['editorTools.toolComponents'],
    (toolComponents) => {
      return toolComponents.filter((component) => component.selected);
    }
  ),
};

export { kaptureSelectors as selectors };
