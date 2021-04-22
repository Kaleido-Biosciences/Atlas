import * as printActions from './printActions';
import * as editorActions from './editorActions';
import * as editorImportActions from './editorImportActions';

export const actions = {
  print: { ...printActions },
  editor: { ...editorActions },
  editorImport: { ...editorImportActions },
};
