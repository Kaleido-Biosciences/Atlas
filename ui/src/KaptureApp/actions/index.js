import * as activitySearchActions from './activitySearchActions';
import * as activityActions from './activityActions';
import * as printActions from './printActions';
import * as editorActions from './editorActions';
import * as editorComponentsActions from './editorComponentsActions';
import * as editorImportActions from './editorImportActions';

export const actions = {
  activitySearch: {
    ...activitySearchActions,
  },
  activity: { ...activityActions },
  print: { ...printActions },
  editor: { ...editorActions },
  editorComponents: { ...editorComponentsActions },
  editorImport: { ...editorImportActions },
};
