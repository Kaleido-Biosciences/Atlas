import * as editorActions from './editorActions';
import * as editorImportActions from './editorImportActions';

export const actions = {
  editor: { ...editorActions },
  editorImport: { ...editorImportActions },
};
