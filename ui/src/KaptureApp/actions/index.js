import * as activitySearchActions from './activitySearchActions';
import * as printActions from './printActions';
import * as editorActions from './editorActions';
import * as editorImportActions from './editorImportActions';

export const actions = {
  activitySearch: {
    ...activitySearchActions,
  },
  print: { ...printActions },
  editor: { ...editorActions },
  editorImport: { ...editorImportActions },
};
